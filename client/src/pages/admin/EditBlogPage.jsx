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

const EditBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [formData, setFormData] = useState({});
  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [editor, setEditor] = useState();
  useEffect(() => {
    const fetchBlogByUrl = async () => {
      try {
        const res = await axios.get(`/api/blog/getblogbyurl/${slug}`);
        if (res.status === 200) {
          setBlog(res.data);
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
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <form onSubmit={handleSave}>
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
            <Select
              value={blog.region}
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
              value={blog.tag}
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
                checked={blog.banner}
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
              {images.map((item, index) => (
                <img
                  src={"/" + item.path}
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
            <Button type="submit" className="w-[200px] mt-4 text-center">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;
