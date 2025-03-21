import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Профиль пользователя</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <span className="font-medium text-gray-600">Логин:</span>
              <span className="text-gray-800">{user.login}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
