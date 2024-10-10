import { GoComment, GoHeart } from "react-icons/go";
import PropTypes from "prop-types";

const Post = ({ imageUrl, text, displayName, username, createdAt, likeCount, replyCount, avatarUrl }) => {
  const date = new Date(createdAt);

  // Format the date to "Month Day" (e.g., "Oct 4")
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',  // "Oct"
    day: 'numeric',  // "4"
  });

  const formatNumber = (number) => {
    if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + 'B';
    } else if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + 'M';
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + 'K';
    }
    return number;
  };

  return (
    <div className="px-2 flex border-b-[1px] border-blue-100/20 py-2">
      <div className="w-10 mr-2">
        <img
          className="w-10 h-10 rounded-full mt-1"
          src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
          alt="avatar"
        />
      </div>
      <div className='text-[15px]'>
        <div className="flex mb-0.5">
          <h5 className='font-bold'>{displayName}</h5>
          &nbsp;
          <h5 className="text-gray-500 lowercase">@{username}</h5>
          <div className="mx-1 text-gray-500 font-bold">&middot;</div>
          <h5 className="text-gray-500">{formattedDate}</h5>
        </div>
        {text && (
          <h6 className="text-start max-w-[516px]">{text}</h6>
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
              {replyCount > 0 && <h6>{formatNumber((replyCount))}</h6>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
}

export default Post;
