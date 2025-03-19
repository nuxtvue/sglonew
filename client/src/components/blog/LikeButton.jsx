import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import useUserStore from "@/store/user";

const LikeButton = ({ blogId, likesArr }) => {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    fetchLikes();
    setIsLiked(likesArr.find((id) => id === user?.id));
  }, [blogId, likesArr, user?.id]);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`/api/likes/${blogId}`);
      setLikes(response.data.count);
    } catch (error) {
      console.error("Ошибка при загрузке лайков:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("Пожалуйста, авторизуйтесь, чтобы поставить лайк");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`/api/likes/${blogId}`);
      setLikes(response.data.count);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Ошибка при обновлении лайка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Button
        variant="ghost"
        size="xl"
        className={cn(
          "group transition-colors",
          isLiked &&
            "text-red-500 hover:text-red-600 rounded-full cursor-pointer "
        )}
        onClick={handleLike}
        disabled={isLoading}
      >
        <Heart
          className={cn(
            "h-30 w-30 transition-all text-3xl cursor-pointer",
            isLiked && "fill-red-500 cursor-pointer",
            "group-hover:scale-120 cursor-pointer"
          )}
        />
      </Button>
      <span className="text-sm font-medium">{likes}</span>
    </div>
  );
};

export default LikeButton;
