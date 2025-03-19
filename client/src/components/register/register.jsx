import React, { useState, useEffect } from "react";
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
    login: "",
    email: "",
    password: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState({
    num1: 0,
    num2: 0,
    operator: "+",
    answer: 0,
  });

  // Генерация новой капчи
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer;
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      default:
        answer = 0;
    }

    setCaptcha({ num1, num2, operator, answer });
  };

  useEffect(() => {
    if (showRegisterDialog) {
      generateCaptcha();
    }
  }, [showRegisterDialog]);

  const submitRegisterForm = async (e) => {
    e.preventDefault();

    // Проверка капчи
    if (parseInt(formData.captcha) !== captcha.answer) {
      toast.error("Неверный ответ в капче!");
      generateCaptcha(); // Генерируем новую капчу
      setFormData({ ...formData, captcha: "" }); // Очищаем поле капчи
      return;
    }

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
      toast.error("Ошибка при регистрации");
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
                  setFormData({ ...formData, login: e.target.value })
                }
                className=""
                type="text"
                name="login"
                autoComplete="login"
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

              {/* Капча */}
              <div className="space-y-2">
                <Label className="text-md">Проверка безопасности</Label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-2 rounded text-lg font-semibold">
                    {captcha.num1} {captcha.operator} {captcha.num2} = ?
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={generateCaptcha}
                    className="h-10 w-10"
                  >
                    ↻
                  </Button>
                </div>
                <Input
                  type="number"
                  value={formData.captcha}
                  onChange={(e) =>
                    setFormData({ ...formData, captcha: e.target.value })
                  }
                  placeholder="Введите ответ"
                  className="mt-2"
                />
              </div>

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
