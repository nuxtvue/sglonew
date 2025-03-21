import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const PanelPage = () => {
  const [stats, setStats] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/blog/countbytags");
        if (!Array.isArray(response.data)) {
          throw new Error("Неверный формат данных");
        }
        const formattedStats = response.data
          .filter((item) => item._id && item.count)
          .sort((a, b) => b.count - a.count)
          .map((item) => ({
            region: item._id,
            count: item.count,
          }));
        setStats(formattedStats);
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserStats = async () => {
      setLoadingUsers(true);
      setUserError(null);
      try {
        const response = await axios.get("/api/user/registrationstats");
        console.log(response.data);
        if (!Array.isArray(response.data)) {
          throw new Error("Неверный формат данных");
        }
        const formattedStats = response.data.map((item) => ({
          date: format(new Date(item.date), "dd.MM.yyyy", { locale: ru }),
          count: item.count,
        }));
        setUserStats(formattedStats);
      } catch (error) {
        console.error("Ошибка при загрузке статистики пользователей:", error);
        setUserError(error.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchStats();
    fetchUserStats();
  }, []);

  const maxCount = Math.max(...stats.map((item) => item.count), 1);
  const maxUserCount = Math.max(...userStats.map((item) => item.count), 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Панель управления
      </h1>

      {/* График по регионам */}
      <Card className="p-6 overflow-x-auto mb-8">
        <h2 className="text-xl font-semibold mb-6">
          Статистика публикаций по регионам
        </h2>

        {error && <div className="text-red-500 mb-4">Ошибка: {error}</div>}

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <FaSpinner className="animate-spin text-2xl" />
          </div>
        ) : stats.length > 0 ? (
          <div className="min-w-[800px]">
            <div className="relative h-[400px] mt-10">
              {/* Сетка */}
              <div className="absolute inset-0 left-12 right-4 top-0 bottom-24 pointer-events-none">
                {/* Горизонтальные линии */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${(i * 100) / 5}%` }}
                  />
                ))}
              </div>

              {/* Ось Y */}
              <div className="absolute left-0 top-0 bottom-24 w-12 flex flex-col justify-between text-sm text-gray-600 bg-white">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-right pr-2 -translate-y-2">
                    {Math.round((maxCount * (5 - i)) / 5)}
                  </span>
                ))}
              </div>

              {/* График */}
              <div className="absolute inset-0 ml-12 mr-4 mb-24 flex items-end gap-1">
                {stats.map((item, index) => {
                  const heightPercentage = Math.floor(
                    (item.count / maxCount) * 100
                  );
                  return (
                    <div
                      key={index}
                      className="group relative flex-1 min-w-[20px] h-full flex flex-col items-center justify-end"
                      style={{ maxWidth: "80px" }}
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t transition-all duration-300 group-hover:bg-blue-600 relative z-10"
                        style={{
                          height: `${heightPercentage}%`,
                          minHeight: "5px",
                        }}
                      >
                        <div className="absolute w-full text-center -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold bg-white px-1 rounded shadow-sm z-20">
                          {item.count}
                        </div>
                      </div>
                      <div className="absolute bottom-0 w-full top-0">
                        <div
                          className="absolute left-0 flex text-sm text-gray-600 font-medium whitespace-nowrap bg-white px-2 py-1"
                          style={{
                            bottom: "-200px",
                            transform: "rotate(-90deg)",
                            transformOrigin: "left top",
                            maxWidth: "none",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                          }}
                        >
                          {item.region}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ось X */}
              <div className="absolute left-12 right-4 bottom-24 h-px bg-gray-300" />
              {/* Ось Y линия */}
              <div className="absolute left-12 top-0 bottom-24 w-px bg-gray-300" />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">
            Нет данных для отображения
          </div>
        )}

        {/* Отладочная информация */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md"></div>
      </Card>

      {/* График регистраций */}
      <Card className="p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Статистика регистраций пользователей
        </h2>

        {userError && (
          <div className="text-red-500 mb-4">Ошибка: {userError}</div>
        )}

        {loadingUsers ? (
          <div className="h-[400px] flex items-center justify-center">
            <FaSpinner className="animate-spin text-2xl" />
          </div>
        ) : userStats.length > 0 ? (
          <div className="min-w-[800px]">
            <div className="relative h-[400px] mt-6">
              {/* Сетка */}
              <div className="absolute inset-0 left-12 right-4 top-0 bottom-24 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${(i * 100) / 5}%` }}
                  />
                ))}
              </div>

              {/* Ось Y */}
              <div className="absolute left-0 top-0 bottom-24 w-12 flex flex-col justify-between text-sm text-gray-600 bg-white">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-right pr-2 -translate-y-2">
                    {Math.round((maxUserCount * (5 - i)) / 5)}
                  </span>
                ))}
              </div>

              {/* График */}
              <div className="absolute inset-0 ml-12 mr-4 mb-24 flex items-end gap-1">
                {userStats.map((item, index) => {
                  const heightPercentage = Math.floor(
                    (item.count / maxUserCount) * 100
                  );
                  return (
                    <div
                      key={index}
                      className="group relative flex-1 min-w-[20px] h-full flex flex-col items-center justify-end"
                      style={{ maxWidth: "80px" }}
                    >
                      <div
                        className="w-full bg-green-500 rounded-t transition-all duration-300 group-hover:bg-green-600 relative z-10"
                        style={{
                          height: `${heightPercentage}%`,
                          minHeight: "5px",
                        }}
                      >
                        <div className="absolute w-full text-center -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold bg-white px-1 rounded shadow-sm z-20">
                          {item.count}
                        </div>
                      </div>
                      <div className="absolute bottom-0 w-full">
                        <div
                          className="absolute left-0 text-sm text-gray-600 font-medium whitespace-nowrap bg-white px-2 py-1"
                          style={{
                            bottom: "-80px",
                            transform: "rotate(-45deg)",
                            transformOrigin: "left top",
                            maxWidth: "none",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                          }}
                        >
                          {item.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ось X */}
              <div className="absolute left-12 right-4 bottom-24 h-px bg-gray-300" />
              {/* Ось Y линия */}
              <div className="absolute left-12 top-0 bottom-24 w-px bg-gray-300" />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">
            Нет данных для отображения
          </div>
        )}
      </Card>
    </div>
  );
};

export default PanelPage;
