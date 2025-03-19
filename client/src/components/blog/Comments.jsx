import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import axios from "axios";
import useUserStore from "@/store/user";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, logout } = useUserStore();

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${blogId}`);
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Пожалуйста, авторизуйтесь для добавления комментария");
      return;
    }
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await axios.post(`/api/comments/${blogId}`, {
        content: newComment,
        userId: user._id,
      });
      setNewComment("");
      fetchComments(); // Обновляем список комментариев
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold mb-4">Комментарии</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Оставьте свой комментарий..."
            className="mb-2"
          />
          <Button type="submit" disabled={loading || !newComment.trim()}>
            {loading ? "Отправка..." : "Отправить комментарий"}
          </Button>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600">
            Чтобы оставить комментарий, пожалуйста, авторизуйтесь
          </p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{comment.user.login}</div>
              <time className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), "dd MMMM yyyy в HH:mm", {
                  locale: ru,
                })}
              </time>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 text-center">Пока нет комментариев</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
