import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/helpers/categories";
import { REGIONS } from "@/helpers/regions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/components/editor/tools";
import { translate } from "@/components/editor/translate";
import { toast } from "sonner";

const EditBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [formData, setFormData] = useState({});
  const [previewImg, setPreviewImg] = useState([]);
  const [region, setRegion] = useState("");
  const [tag, setTag] = useState("");
  const [images, setImages] = useState([]);
  const [filesIfChange, setFilesIfChange] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [editor, setEditor] = useState();
  useEffect(() => {
    const fetchBlogByUrl = async () => {
      try {
        const res = await axios.get(`/api/blog/getblogbyurl/${slug}`);
        if (res.status === 200) {
          setBlog(res.data);
          setFormData({ ...formData, banner: res.data.banner });
          setRegion(res.data.region);
          setTag(res.data.tag);
          setImages(res.data.coverImageName);
          if (!res.data.content[0].id) {
            setEditor(
              new EditorJS({
                holder: "editor",
                data: {
                  blocks: [
                    {
                      id: new Date().getTime(),
                      type: "paragraph",
                      data: {
                        text: res.data.content[0],
                      },
                    },
                  ],
                },

                placeholder: "Начните писать...",
                tools: tools,
                i18n: translate,
              })
            );
          } else {
            setEditor(
              new EditorJS({
                holder: "editor",
                data: {
                  blocks: res.data.content,
                },

                placeholder: "Начните писать...",
                tools: tools,
                i18n: translate,
              })
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogByUrl();
  }, [slug]);

  const handleChangeFiles = (files) => {
    setPreviewImg([]);
    let totalSize = 0;
    let images = [];
    for (let i = 0; i < files.files.length; i++) {
      totalSize += files.files[i].size / 1024 / 1024;
      images.push(files.files[i]);
      setPreviewImg((prev) => [...prev, URL.createObjectURL(files.files[i])]);
    }
    setTotalSize(totalSize.toFixed(2));
    setFilesIfChange(images);
  };

  const handleSave = async (e) => {
    console.log("working");
    e.preventDefault();
    const savedData = await editor.save();
    const content = savedData.blocks;
    console.log(content);
    console.log(blog.content);
    console.log(blog);
    const formDataNew = new FormData();
    formDataNew.append("title", formData.title);
    formDataNew.append("description", formData.description);
    if (blog.region !== region) formDataNew.append("region", region);
    if (blog.tag !== tag) formDataNew.append("category", tag);
    formDataNew.append("banner", formData.banner);
    if (JSON.stringify(content) === JSON.stringify(blog.content)) {
      console.log("not changed");
    } else {
      formDataNew.append("content", JSON.stringify(content));
    }

    filesIfChange.forEach((file) => {
      formDataNew.append("files", file); // "files" - это имя поля для файлов
    });
    formDataNew.append("files", filesIfChange);
    formDataNew.append("id", blog._id);
    try {
      const res = await axios.post("/api/blog/edit", formDataNew, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success(
          <div className=" text-green-500 font-bold p-2 rounded text-[16px]">
            Блог успешно обновлен
          </div>,
          { icon: "🚀" }
        );
      }
    } catch (err) {
      toast.error(
        <div className=" text-red-500 font-bold p-2 rounded text-[16px]">
          Ошибка при обновлении блога
        </div>,
        { icon: "😢" }
      );
      console.log(err);
    }
  };
  return (
    <div>
      <h1>{blog.title}</h1> {blog.region}
      <div>
        <form onSubmit={(e) => handleSave(e)}>
          <Input
            placeholder="Заголовок"
            defaultValue={blog.title}
            className="w-full my-4"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Textarea
            placeholder="Короткое описание"
            className="w-full my-4"
            defaultValue={blog.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="flex gap-4 my-8 items-center">
            {blog && (
              <Select
                value={region}
                onValueChange={(value) => setRegion(value)}
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
            )}

            {blog && (
              <Select value={tag} onValueChange={(value) => setTag(value)}>
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
            )}

            <div className="flex items-center gap-4">
              <span>Поставить на баннер:</span>
              {blog && (
                <Checkbox
                  checked={!!formData.banner}
                  className="border-2 w-5.5 h-5.5"
                  onCheckedChange={(e) =>
                    setFormData({ ...formData, banner: e })
                  }
                />
              )}
            </div>
          </div>
          <h3 className="text-lg text-center">Основной контент</h3>{" "}
          <div
            id="editor"
            className="h-auto  bg-white p-2 shadow-xl rounded-lg w-full"
          ></div>
          {/*  <Textarea 
            className="w-full my-4"
            defaultValue={blog.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          /> */}
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
              {previewImg.length === 0 &&
                images.map((item, index) => (
                  <img
                    src={"/" + item.path}
                    alt=""
                    key={index}
                    className="w-[300px] h-[200px] object-cover"
                  />
                ))}
              {previewImg &&
                previewImg.map((item, index) => (
                  <img
                    src={item}
                    alt=""
                    key={index}
                    className="w-[300px] h-[200px] object-cover"
                  />
                ))}
            </div>
            <span className="text-gray-500 text-sm">
              {totalSize > 0 &&
                "Общий размер всех файлов: " + totalSize + " Мб"}
            </span>
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="w-[200px] mt-4 text-center  rounded-lg p-2"
              onClick={(e) => handleSave(e)}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;
