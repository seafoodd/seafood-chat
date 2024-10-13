import { GoComment, GoHeart } from "react-icons/go";
import PropTypes from "prop-types";
import { formatNumber } from "../utils/FormatNumber.js";
import { Link, useNavigate } from "react-router-dom";

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
}) => {
  const navigate = useNavigate();
  const date = new Date(createdAt);

  // using this to prevent <Link> nesting
  const handlePostClick = () => {
    if (postId) {
      navigate(`/status/${postId}`);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

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
        className={`px-4 py-2 ${postId && "hover:cursor-pointer"}`}
        onClick={handlePostClick}
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
            <h6 className="text-start max-w-[516px] mt-3 text-[17px]">
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
            className="text-gray-500 my-4 text-start hover:underline"
            dangerouslySetInnerHTML={{ __html: formattedDate }}
          ></h5>
        </div>
        <div className="text-[13px] border-y-[1px] border-blue-100/20 ">
          <div className="px-2 my-3 inline-flex text-gray-500 gap-16 w-full">
            <div className="flex items-center gap-1">
              <GoHeart size={20} />
              {likeCount > 0 && <h6>{formatNumber(likeCount)}</h6>}
            </div>
            <div className="flex items-center gap-1">
              <GoComment size={20} />
              {replyCount > 0 && <h6>{formatNumber(replyCount)}</h6>}
            </div>
          </div>
        </div>
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
        <div className="text-[15px]">
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
            <h5 className="text-gray-500 hover:underline">{formattedDate}</h5>
          </div>

          {text && (
            <h6 className="text-start max-w-[516px] leading-snug">{text}</h6>
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
          <div className="text-[13px]">
            <div className="mt-3 flex gap-16 text-gray-500">
              <div className="flex items-center gap-1">
                <GoHeart size={18} />
                {likeCount > 0 && <h6>{formatNumber(likeCount)}</h6>}
              </div>
              <div className="flex items-center gap-1">
                <GoComment size={18} />
                {replyCount > 0 && <h6>{formatNumber(replyCount)}</h6>}
              </div>
            </div>
          </div>
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
};

export default Post;
