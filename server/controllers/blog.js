import { Blog } from "../models/blog.model.js";

export const getBlogByRegion = async (req, res) => {
  const { slug } = req.params;
  let { page } = req.query;
  let maxLimit = 9;
  console.log(slug);
  console.log(req.query);
  const skip = (page - 1) * maxLimit;
  try {
    const blogs = await Blog.find({ region: slug })
      .skip(skip) // Пропустить первые N документов
      .limit(maxLimit) // Ограничить количество документов
      .exec();
    console.log(blogs);

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogByUrl = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ url: slug });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};
