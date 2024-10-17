import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import PropTypes from "prop-types";
import { useCurrentQuery } from "../app/services/userApi.js";
import Loading from "./Loading.jsx";
import { useCreatePostMutation } from "../app/services/postApi.js";
import { useState } from "react";

const PostForm = ({ replyId }) => {
  const { data: userData, error, isLoading } = useCurrentQuery();
  const [createPost] = useCreatePostMutation();
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (postText) {
      formData.append("text", postText);
    }

    if (replyId) {
      formData.append("reply", JSON.stringify({ replyToId: replyId }));
    }

    if (postImage) {
      formData.append("image", postImage);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const post = await createPost(formData).unwrap();
      console.log(post);
      setPostText("");
      setPostImage(null);
    } catch (err) {
      console.error("Failed to create post: ", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`${userData ? "flex" : "hidden"} items-center px-4 border-b-[1px] border-blue-100/20 pt-2 pb-6`}
        >
          <Link to={`/${userData?.username}`} className="flex-none">
            <img
              className="w-10 h-10 rounded-full mt-1 transition-opacity hover:opacity-90"
              src={`${import.meta.env.VITE_API_URL}${userData?.avatarUrl}`}
              alt="avatar"
            />
          </Link>
          <form
            className="flex w-full items-center justify-between ml-2"
            onSubmit={handleSubmit}
          >
            <div className='flex-col text-start'>
              <input
                type="text"
                placeholder={
                  replyId ? "Post your reply" : "What is happening?!"
                }
                className="placeholder-gray-500 text-[20px] bg-white/0"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{display: "none"}}
                onChange={(e) => setPostImage(e.target.files[0])}
              />
              <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
                Choose an image
              </label>
            </div>
            <Button
              text={replyId ? "Reply" : "Post"}
              type="submit"
              className=""
            />
          </form>
        </div>
      )}
    </>
  );
};

PostForm.propTypes = {
  replyId: PropTypes.number,
};

export default PostForm;
