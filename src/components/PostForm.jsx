import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import PropTypes from "prop-types";

const PostForm = ({ isReply }) => {
  return (
    <div className="flex items-center px-4 border-b-[1px] border-blue-100/20 pt-2 pb-6">
      <Link to={`/seafood`} className="flex-none">
        <img
          className="w-10 h-10 rounded-full mt-1 transition-opacity hover:opacity-90"
          src={`${import.meta.env.VITE_API_URL}/media/default_images/default-avatar.png`}
          alt="avatar"
        />
      </Link>
      {/*<h4 className="text-gray-500 text-[20px] ml-2">Post your reply</h4>*/}
      <form className="flex w-full items-center justify-between ml-2">
        <input
          type="text"
          placeholder={isReply ? "Post your reply" : "What is happening?!"}
          className="placeholder-gray-500 text-[20px] bg-white/0"
        />
        <Button
          text={isReply ? "Reply" : "Post"}
          onClick={() => console.log(isReply ? "Reply" : "Post")}
          className=""
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  isReply: PropTypes.bool,
};

export default PostForm;
