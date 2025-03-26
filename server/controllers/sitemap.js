import { REGIONS } from "../helpers/regions.js";
import { Blog } from "../models/blog.model.js"; // Модель для получения динамических маршрутов
import { format } from "date-fns";

export const generateSitemap = async (req, res) => {
  try {
    // Базовый URL вашего сайта
    const baseUrl = "http://localhost:5173";

    // Статические страницы
    const staticPages = ["", "/blog", "/category", "/about", "/contact"];

    // Динамические страницы (например, блоги)
    const blogs = await Blog.find().select("url"); // Получаем slug и дату обновления
    const dynamicPages = blogs.map((blog) => ({
      loc: `/blog/${blog.url}`,
      lastmod: format(new Date(), "yyyy-MM-dd"),
    }));
    let regionsPages = [];
    REGIONS.forEach((region) => {
      regionsPages.push({
        loc: `/blog/regions/${region.slug}`,
        lastmod: format(new Date(), "yyyy-MM-dd"),
      });
    });

    // Генерация XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Добавление статических страниц
    staticPages.forEach((page) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}${page}</loc>\n`;
      sitemap += `    <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>\n`;
      sitemap += `    <changefreq>daily</changefreq>\n`;
      sitemap += `    <priority>0.8</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Добавление динамических страниц
    dynamicPages.forEach((page) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}${page.loc}</loc>\n`;
      sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.6</priority>\n`;
      sitemap += `  </url>\n`;
    });
    regionsPages.forEach((page) => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}${page.loc}</loc>\n`;
      sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.9</priority>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>`;

    // Установка заголовков и отправка XML
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Ошибка при генерации sitemap:", error);
    res.status(500).send("Ошибка при генерации sitemap");
  }
};
