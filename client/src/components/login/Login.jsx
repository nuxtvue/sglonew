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
import useUserStore from "@/store/user";

const LoginDialog = ({ showLoginDialog, setShowLoginDialog }) => {
  const [formData, setFormData] = useState({
    username: "",
    login: "",
    password: "",
  });
  const { user, login } = useUserStore();
  console.log(user);

  const submitRegisterForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        login(res.data.user);
        setShowLoginDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Страница входа</DialogTitle>
            <DialogDescription>Вход на сайт</DialogDescription>
            <form className="flex flex-col space-y-4">
              <Label>Login</Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
                type="text"
                name="login"
                autoComplete="login"
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
                Войти
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
