import { GoComment, GoHeart, GoHeartFill } from "react-icons/go";
import { formatNumber } from "../utils/FormatNumber.js";
import { useState } from "react";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../app/services/likeApi.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ActionPanel = ({
  initialIsLiked,
  postId,
  initialLikeCount,
  replyCount,
  isSmall,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const { isAuthenticated, userInfo, loading } = useSelector(
    (state) => state.auth,
  );
  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      console.log("Non-authenticated like attempt"); // TODO: add modal window for registration
      return;
    }
    try {
      if (!isLiked) {
        await likePost(postId);
        console.log("Post liked successfully");
      } else {
        await unlikePost(postId);
        console.log("Post unliked successfully");
      }
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      console.error("Failed to like post: ", err);
    }
  };

  return (
    <div
      className={`text-[13px] flex font-normal ${!isSmall && "border-y-[1px] border-blue-100/20"}`}
    >
      <div
        className={`${isSmall ? "-mb-1" : "px-2"} my-1 flex text-gray-500 gap-6 w-full`}
      >
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${
            isLiked ? "text-color-2" : "hover:text-color-2"
          }`}
        >
          <div className="hover:bg-color-2/10 -ml-2.5 rounded-full p-2.5 transition-colors">
            {isLiked ? (
              <GoHeartFill strokeWidth={1} size={isSmall ? 18 : 20} />
            ) : (
              <GoHeart strokeWidth={1} size={isSmall ? 18 : 20} />
            )}
          </div>
          <span className="-ml-2 min-w-[64px] text-start">
            {likeCount > 0 ? formatNumber(likeCount) : ""}
          </span>
        </button>
        <div className="flex items-center gap-1 transition-colors hover:text-color-1">
          <div className="hover:bg-color-1/10 p-2.5 -ml-2.5 rounded-full">
            <GoComment strokeWidth={1} size={isSmall ? 18 : 20} />
          </div>
          <span className="-ml-2 min-w-[20px] text-start">
            {replyCount > 0 ? formatNumber(replyCount) : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

ActionPanel.propTypes = {
  initialIsLiked: PropTypes.bool,
  postId: PropTypes.string,
  initialLikeCount: PropTypes.number,
  replyCount: PropTypes.number,
  isSmall: PropTypes.bool,
};

export default ActionPanel;
