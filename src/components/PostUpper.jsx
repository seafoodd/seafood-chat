import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown.jsx";
import { AiOutlineDelete } from "react-icons/ai";
import { RiFlag2Line } from "react-icons/ri";
import { useDeletePostMutation } from "../app/services/postApi.js";

const PostUpper = ({
  displayName,
  username,
  avatarUrl,
  postId,
  isOwner,
  formattedDate,
  isCompact,
}) => {
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();

  return (
    <div className="flex justify-between mb-0.5">
      <div className="flex">
        {!isCompact && (
          <div className={`w-10 mr-2`}>
            <Link to={`/${username}`} onClick={handleLinkClick}>
              <img
                className="w-10 h-10 rounded-full"
                src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
                alt="avatar"
              />
            </Link>
          </div>
        )}
        <div
          className={`flex ${isCompact ? "items-center" : "flex-col items-start"} leading-snug justify-center`}
        >
          <Link
            to={`/${username}`}
            onClick={handleLinkClick}
            className="font-bold decoration-2 hover:underline"
          >
            {displayName}
          </Link>
          {isCompact && "\u00A0"}
          <Link
            to={`/${username}`}
            onClick={handleLinkClick}
            className="text-gray-500 lowercase"
          >
            @{username}
          </Link>
          {isCompact && (
            <>
              <div className="mx-1 text-gray-500 font-bold">&middot;</div>
              <h5 className="text-gray-500 hover:underline hover:cursor-pointer">
                {formattedDate}
              </h5>
            </>
          )}
        </div>
      </div>
      <div>
        <Dropdown
          buttonLabel="More Options"
          options={[
            {
              icon: <RiFlag2Line size={20} />,
              label: "Report Post",
              onClick: () => console.log("post reported"),
            },
            isOwner
              ? {
                  icon: <AiOutlineDelete size={20} />,
                  label: "Delete Post",
                  onClick: () => {
                    deletePost(postId)
                    navigate('/')
                  },
                }
              : null,
          ].filter(Boolean)}
        />
      </div>
    </div>
  );
};

PostUpper.propTypes = {
  displayName: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  postId: PropTypes.string,
  formattedDate: PropTypes.string,
  isCompact: PropTypes.bool,
  isOwner: PropTypes.bool,
};

export default PostUpper;
