import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import ActionPanel from "./ActionPanel.jsx";
import PostUpper from "./PostUpper.jsx";
import { useCurrentQuery } from "../app/services/userApi.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Post = ({
  imageUrl,
  text,
  displayName,
  username,
  createdAt,
  likeCount,
  replyCount,
  avatarUrl,
  isFull,
  postId,
  isLiked,
  authorId,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, loading } = useSelector(
    (state) => state.auth,
  );
  const {
    data: userData,
    error,
    isLoading,
  } = isAuthenticated
    ? useCurrentQuery()
    : { data: null, error: null, isLoading: false };
  const isOwner = userData ? authorId === userData.id : false;

  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);

  useEffect(() => {
    setCurrentLikeCount(likeCount);
    setCurrentIsLiked(isLiked);
  }, [postId, likeCount, isLiked]);

  // using this to prevent <Link> nesting
  const handlePostClick = () => {
    if (postId) {
      navigate(`/status/${postId}`);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const date = new Date(createdAt);
  const formattedDate = isFull
    ? `${date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })} <strong>\u00B7</strong> ${date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
    : date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });

  if (isFull) {
    return (
      <div className={`px-4 py-2`}>
        <div className="text-[15px] ">
          <PostUpper
            displayName={displayName}
            username={username}
            isOwner={isOwner}
            avatarUrl={avatarUrl}
            postId={postId}
          />

          {text && (
            <h6 className="text-start mt-3 text-[17px] break-words">{text}</h6>
          )}
          {imageUrl && (
            <div className="mt-3">
              <img
                className="max-h-[1000px] w-full rounded-2xl border-[1px] border-blue-100/10"
                src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
                alt=""
              />
            </div>
          )}
          <h5
            className="text-gray-500 my-4 text-start hover:underline hover:cursor-pointer"
            dangerouslySetInnerHTML={{ __html: formattedDate }}
          ></h5>
        </div>
        <ActionPanel
          initialIsLiked={currentIsLiked}
          postId={postId}
          initialLikeCount={currentLikeCount}
          replyCount={replyCount}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`px-4 flex border-b-[1px] border-blue-100/20 py-2 ${postId && "hover:cursor-pointer"}`}
        onClick={handlePostClick}
      >
        <div className={`w-10 mr-2 flex-none`}>
          <Link to={`/${username}`} onClick={handleLinkClick}>
            <img
              className="w-10 h-10 rounded-full mt-1 transition-opacity hover:opacity-90"
              src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
              alt="avatar"
            />
          </Link>
        </div>
        <div className="text-[15px] w-full">
          <PostUpper
            displayName={displayName}
            username={username}
            isOwner={isOwner}
            postId={postId}
            formattedDate={formattedDate}
            isCompact
          />

          {text && (
            <h6 className="text-start max-w-[516px] leading-snug break-words">
              {text}
            </h6>
          )}
          {imageUrl && (
            <div className="mt-3">
              <img
                className="max-h-[520px] w-auto rounded-2xl border-[1px] border-blue-100/10"
                src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
                alt=""
              />
            </div>
          )}
          <ActionPanel
            isSmall
            initialIsLiked={isLiked}
            postId={postId}
            initialLikeCount={likeCount}
            replyCount={replyCount}
          />
        </div>
      </div>
    );
  }
};

Post.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.string,
  displayName: PropTypes.string,
  username: PropTypes.string,
  likeCount: PropTypes.number,
  replyCount: PropTypes.number,
  avatarUrl: PropTypes.string,
  isFull: PropTypes.bool,
  postId: PropTypes.string,
  isLiked: PropTypes.bool,
  authorId: PropTypes.string,
};

export default Post;
