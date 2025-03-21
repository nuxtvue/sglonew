import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const AllUsersAd = () => {
  const [users, setUsers] = React.useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/user/allusers");
      if (res.data) setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    try {
      let pr = window.confirm(
        "Вы действительно хотите сделать этого пользователя админом?"
      );
      console.log(pr);
      if (pr) {
        const res = await axios.put(`/api/user/makeadmin/${id}`);
        console.log(res);
      }

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      let pr = window.confirm(
        "Вы действительно хотите удалить этого пользователя?"
      );
      console.log(pr);
      if (pr) {
        const res = await axios.delete(`/api/user/deleteuser/${id}`);
        console.log(res);
      }

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center">Все пользователи</h1>
      <div className="flex flex-col">
        <div className="flex flex-row border border-gray-200 gap-2 p-2">
          <p className="w-1/5 font-semibold border-r-2 border-gray-200 text-center">
            Логин
          </p>
          <p className="w-1/5 font-semibold border-r-2 border-gray-200 text-center">
            email
          </p>
          <p className="w-1/5 font-semibold border-r-2  border-gray-200 text-center">
            Роль
          </p>
          <p className="w-1/5 font-semibold border-r-2  border-gray-200 text-center">
            Сделать админом
          </p>
          <p className="w-1/5 font-semibold  border-gray-200 text-center">
            Удалить
          </p>
        </div>
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-row border border-gray-200 gap-2 p-2"
          >
            <p className="w-1/5 border-r-2">{user.login}</p>
            <p className="w-1/5 border-r-2">{user.email}</p>
            <p className="w-1/5 border-r-2">{user.role}</p>
            <p className="w-1/5 border-r-2">
              <Checkbox
                className="border border-gray-400 "
                checked={user.role === "admin"}
                onCheckedChange={() => {
                  makeAdmin(user._id);
                }}
              />
            </p>
            <p className="w-1/5">
              <Button
                variant={"destructive"}
                onClick={() => {
                  deleteUser(user._id);
                }}
              >
                <FaRegTrashAlt />
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersAd;
