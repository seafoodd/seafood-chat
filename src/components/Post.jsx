import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import ActionPanel from "./ActionPanel.jsx";

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
}) => {
  const navigate = useNavigate();

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
      <div
        className={`px-4 py-2`}
      >
        <div className="text-[15px] ">
          <div className="flex mb-0.5 ">
            <div className={`w-10 mr-2`}>
              <Link to={`/${username}`} onClick={handleLinkClick}>
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
                  alt="avatar"
                />
              </Link>
            </div>
            <div
              className={`flex flex-col items-start leading-snug justify-center`}
            >
              <Link
                to={`/${username}`}
                onClick={handleLinkClick}
                className="font-bold decoration-2 hover:underline"
              >
                {displayName}
              </Link>
              <Link
                to={`/${username}`}
                onClick={handleLinkClick}
                className="text-gray-500 lowercase"
              >
                @{username}
              </Link>
            </div>
          </div>

          {text && (
            <h6 className="text-start mt-3 text-[17px] break-words">
              {text}
            </h6>
          )}
          {imageUrl && (
            <div className="mt-3">
              <img
                className="max-h-[520px] max-w-[516px] rounded-2xl"
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
          initialIsLiked={isLiked}
          postId={postId}
          initialLikeCount={likeCount}
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
        <div className={`w-10 mr-2`}>
          <Link to={`/${username}`} onClick={handleLinkClick}>
            <img
              className="w-10 h-10 rounded-full mt-1 transition-opacity hover:opacity-90"
              src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
              alt="avatar"
            />
          </Link>
        </div>
        <div className="text-[15px] w-full">
          <div className="flex mb-0.5">
            <Link
              to={`/${username}`}
              onClick={handleLinkClick}
              className="font-bold decoration-2 hover:underline"
            >
              {displayName}
            </Link>
            &nbsp;
            <Link
              to={`/${username}`}
              onClick={handleLinkClick}
              className="text-gray-500 lowercase"
            >
              @{username}
            </Link>
            <div className="mx-1 text-gray-500 font-bold">&middot;</div>
            <h5 className="text-gray-500 hover:underline hover:cursor-pointer">{formattedDate}</h5>
          </div>

          {text && (
            <h6 className="text-start max-w-[516px] leading-snug break-words">{text}</h6>
          )}
          {imageUrl && (
            <div className="mt-3">
              <img
                className="max-h-[520px] max-w-[516px] rounded-2xl border-[1px] border-blue-100/10"
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
};

export default Post;
