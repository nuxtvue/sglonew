import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Smile, Shield, Check, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import axios from "axios";
import useUserStore from "@/store/user";
import { GoTrash } from "react-icons/go";
import { toast } from "sonner";

const EMOJIS = [
  "😀",
  " 😂",
  "😊",
  "😍",
  "😘",
  "😋",
  "🤪",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "😖",
  "😭",
  "😠",
  "😡",
  "😰",
  "💪",
  "👍",
  "👏",
  "❤️",
  "💞",
  "💖",
  "🌺",
  "🌹",
  "☀️",
];

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { user } = useUserStore();
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async (pageNum = 1) => {
    try {
      const response = await axios.get(
        `/api/comments/${blogId}?page=${pageNum}&limit=5`
      );
      if (pageNum === 1) {
        setComments(response.data.comments);
      } else {
        setComments((prev) => [...prev, ...response.data.comments]);
      }
      console.log(response.data);
      setHasMore(response.data.hasMore);
      setTotalComments(response.data.total);
      setPage(pageNum);
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
    }
  };

  const handleLoadMore = () => {
    fetchComments(page + 1);
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
      fetchComments(1);
      toast.success("Комментарий добавлен, он появится после модерации");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    } finally {
      setLoading(false);
    }
  };

  const insertEmoji = (emoji) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const text = newComment;
    const newText = text.substring(0, start) + emoji + text.substring(end);

    setNewComment(newText);

    // Устанавливаем позицию курсора после вставленного эмодзи
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const handleModerate = async (commentId, status) => {
    try {
      await axios.patch(`/api/comments/${commentId}/moderate`, {
        status,
        moderatorId: user._id,
      });
      toast.success(
        status === "approved" ? "Комментарий одобрен" : "Комментарий отклонен"
      );
      fetchComments(1);
    } catch (error) {
      console.error("Ошибка при модерации комментария:", error);
      toast.error("Ошибка при модерации комментария");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      toast.success("Комментарий удален");
      fetchComments(1);
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
      toast.error("Ошибка при удалении комментария");
    } finally {
      setDeletePopoverOpen(false);
      setCommentToDelete(null);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold mb-4">Комментарии ({totalComments})</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Оставьте свой комментарий..."
              className="mb-2 pr-10"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Smile className="h-5 w-5 absolute right-2 top-2 cursor-pointer text-gray-600 hover:text-yellow-700" />
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-2">
                <div className="grid grid-cols-5 gap-1">
                  {EMOJIS.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => insertEmoji(emoji)}
                      className="p-2 hover:bg-gray-100 rounded-md text-xl transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
        {comments
          .filter((comment) => {
            // Для админов показываем все комментарии
            if (user?.role === "admin") return true;
            // Для обычных пользователей только одобренные
            return comment.status === "approved";
          })
          .map((comment) => (
            <div
              key={comment._id}
              className={`bg-gray-50 p-4 rounded-lg hover:bg-gray-100 ${
                comment.status === "pending"
                  ? "border-l-4 border-yellow-500"
                  : ""
              } ${
                comment.status === "rejected"
                  ? "border-l-4 border-red-500 opacity-75"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{comment.user.login}</div>
                <time className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), "dd MMMM yyyy в HH:mm", {
                    locale: ru,
                  })}
                </time>
              </div>
              <p className="text-gray-700">{comment.content}</p>
              <div className="flex justify-end gap-2 mt-2">
                {user?.role === "admin" && comment.status === "pending" && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleModerate(comment._id, "approved")}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Одобрить
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleModerate(comment._id, "rejected")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Отклонить
                    </Button>
                  </>
                )}
                {(comment.user._id === user?._id || user?.role === "admin") && (
                  <Popover
                    open={deletePopoverOpen && commentToDelete === comment._id}
                    onOpenChange={(open) => {
                      if (open) {
                        setCommentToDelete(comment._id);
                        setDeletePopoverOpen(true);
                      } else {
                        setDeletePopoverOpen(false);
                        setCommentToDelete(null);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <GoTrash className="h-4 w-4 mr-1" />
                        Удалить
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">Удалить комментарий?</h4>
                        <p className="text-sm text-gray-500">
                          Это действие нельзя отменить. Комментарий будет удален
                          навсегда.
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setDeletePopoverOpen(false);
                              setCommentToDelete(null);
                            }}
                          >
                            Отмена
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(comment._id)}
                          >
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          ))}
        {comments.filter((comment) => {
          if (user?.role === "admin") return true;
          return comment.status === "approved";
        }).length === 0 && (
          <p className="text-gray-500 text-center">Пока нет комментариев</p>
        )}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="hover:bg-gray-100 transition-colors"
            >
              Показать еще
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
