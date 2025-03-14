import React, { useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { translate } from "@/components/editor/translate";
import { tools } from "@/components/editor/tools";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS } from "@/helpers/regions";
import { categories } from "@/helpers/categories";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
const NewBlogPage = () => {
  const [editor, setEditor] = useState();
  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);

  const [totalSize, setTotalSize] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: "",
    banner: false,
    content: null,
    region: "",
    category: "",
  });
  useEffect(() => {
    setEditor(
      new EditorJS({
        holder: "editor",
        placeholder: "Начните писать...",
        tools: tools,

        i18n: translate,
      })
    );
  }, []);
  const handleChangeFiles = (e) => {
    const files = Array.from(e.files);
    console.log(files.length);
    console.log(files);
    let prev = [];
    for (let i = 0; i < files.length; i++) {
      prev.push(URL.createObjectURL(files[i]));
    }

    const totalSizeMB = (
      files.reduce((acc, file) => acc + file.size, 0) /
      (1024 * 1024)
    ).toFixed(2);
    setTotalSize(totalSizeMB);
    setImages(files);
    setPreviewImg(prev);
  };
  const handleSave = async (e) => {
    e.preventDefault();

    // Получаем данные из EditorJS
    const data = await editor.save();

    // Создаем объект FormData для отправки данных
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("banner", formData.banner);
    formDataToSend.append("content", JSON.stringify(data.blocks)); // Преобразуем блоки контента в JSON-строку
    formDataToSend.append("region", formData.region);
    formDataToSend.append("category", formData.category);

    // Добавляем файлы в FormData
    images.forEach((file) => {
      formDataToSend.append("files", file); // "files" - это имя поля для файлов
    });
    console.log(formDataToSend.get("content"));
    try {
      const response = await axios.post("/api/blog/newblog", formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Указываем правильный Content-Type
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <h1 className="text-center text-xl">Создание новой новости</h1>
      <form onSubmit={handleSave}>
        <Input
          placeholder="Заголовок"
          className="w-full my-4"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Textarea
          placeholder="Короткое описание"
          className="w-full my-4"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="flex gap-4 my-8 items-center">
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, region: value })
            }
          >
            <SelectTrigger className="w-[280px] ">
              <SelectValue placeholder="Выберите район или город" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Города и районы</SelectLabel>
                {REGIONS.map((region) => (
                  <SelectItem key={region.id} value={region.name}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-[280px] ">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Категории</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-4">
            <span>Поставить на баннер:</span>
            <Checkbox
              className="border-2 w-5.5 h-5.5"
              onCheckedChange={(e) => setFormData({ ...formData, banner: e })}
            />
          </div>
        </div>
        <h3 className="text-lg text-center">Основной контент</h3>
        <div
          id="editor"
          className="h-auto  bg-white p-2 shadow-xl rounded-lg w-full"
        ></div>
        <div>
          <Input
            type={"file"}
            multiple
            name="images"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="w-full my-4"
            onChange={(e) => handleChangeFiles(e.target)}
          />
          <div className="flex gap-2 flex-wrap items-start justify-start mx-auto text-center">
            {previewImg.map((item, index) => (
              <img
                src={item}
                alt=""
                key={index}
                className="w-[300px] h-[200px] object-cover"
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            {totalSize > 0 && "Общий размер всех файлов: " + totalSize + " Мб"}
          </span>
        </div>
        <div className="text-center">
          <Button type="submit" className="w-[200px] mt-4 text-center">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPage;
