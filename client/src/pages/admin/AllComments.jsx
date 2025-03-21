import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Check, X, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [page, statusFilter]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `/api/comments?page=${page}&limit=10&status=${statusFilter}`
      );
      if (page === 1) {
        setComments(response.data.comments);
      } else {
        setComments((prev) => [...prev, ...response.data.comments]);
      }
      setHasMore(response.data.hasMore);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
      toast.error("Ошибка при загрузке комментариев");
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleModerate = async (commentId, status) => {
    try {
      await axios.patch(`/api/comments/${commentId}/moderate`, {
        status,
      });
      toast.success(
        status === "approved" ? "Комментарий одобрен" : "Комментарий отклонен"
      );
      fetchComments();
    } catch (error) {
      console.error("Ошибка при модерации комментария:", error);
      toast.error("Ошибка при модерации комментария");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      toast.success("Комментарий удален");
      fetchComments();
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
      toast.error("Ошибка при удалении комментария");
    } finally {
      setDeletePopoverOpen(false);
      setCommentToDelete(null);
    }
  };

  const filteredComments = comments.filter((comment) =>
    comment.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Управление комментариями</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Поиск по комментариям..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="pending">Ожидают</SelectItem>
            <SelectItem value="approved">Одобренные</SelectItem>
            <SelectItem value="rejected">Отклоненные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div
            key={comment._id}
            className={`bg-white p-4 rounded-lg shadow-sm ${
              comment.status === "pending" ? "border-l-4 border-yellow-500" : ""
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
            <p className="text-gray-700 mb-4">{comment.content}</p>
            <div className="flex justify-end gap-2">
              {comment.status === "pending" && (
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
                    <Trash2 className="h-4 w-4 mr-1" />
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
            </div>
          </div>
        ))}
        {loading && <div className="text-center">Загрузка...</div>}
        {!loading && filteredComments.length === 0 && (
          <div className="text-center text-gray-500">
            Комментарии не найдены
          </div>
        )}
        {hasMore && !loading && (
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

export default AllComments;
