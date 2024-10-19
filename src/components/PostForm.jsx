import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import PropTypes from "prop-types";
import { useCurrentQuery } from "../app/services/userApi.js";
import Loading from "./Loading.jsx";
import { useCreatePostMutation } from "../app/services/postApi.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegImage } from "react-icons/fa6";

const PostForm = ({ replyId, refetch }) => {
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
      if (refetch) refetch();
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
          className={`${userData ? "flex" : "hidden"} px-4 border-b-[1px] border-blue-100/20 min-h-24 pt-1`}
        >
          <div className="h-full min-w-10 pt-3">
            <div className="h-full w-10">
              <Link to={`/${userData?.username}`}>
                <img
                  className="flex w-10 h-10 rounded-full transition-opacity hover:opacity-90"
                  src={`${import.meta.env.VITE_API_URL}${userData?.avatarUrl}`}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>
          <form
            className="flex w-full items-center justify-between ml-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col text-start mt-3 justify-between w-full">
              <textarea
                maxLength={280}
                placeholder={
                  replyId ? "Post your reply" : "What is happening?!"
                }
                className="placeholder-gray-500 text-[20px] h-auto
                font-normal bg-white/0 outline-none resize-none pt-2
                border-blue-100/20 focus:border-b-[1px] focus:pb-2"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight + 1}px`;
                }}
              />
              <div className="flex items-center justify-between py-2">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-color-1"
                >
                  <FaRegImage size={16} />
                </label>
                <Button
                  text={replyId ? "Reply" : "Post"}
                  type="submit"
                  className=""
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

PostForm.propTypes = {
  replyId: PropTypes.string,
  refetch: PropTypes.func,

};

export default PostForm;
