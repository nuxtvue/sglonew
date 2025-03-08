import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

import axios from "axios";

const RegisterDialog = ({ showRegisterDialog, setShowRegisterDialog }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(showRegisterDialog);
  const submitRegisterForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setShowRegisterDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Страница регистрации</DialogTitle>
            <DialogDescription>
              Заполните поля для регистрации на сайте
            </DialogDescription>
            <form className="flex flex-col space-y-4">
              <Label className="text-md">Логин</Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className=""
                type="text"
                name="username"
                autoComplete="username"
              />
              <Label>Email</Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                name="email"
                autoComplete="email"
              />
              <Label className="text-md">Пароль</Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                name="password"
                autoComplete="current-password"
              />
              <Button
                onClick={(e) => submitRegisterForm(e)}
                className="mt-4 w-full text-lg cursor-pointer"
              >
                Зарегистрироваться
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
