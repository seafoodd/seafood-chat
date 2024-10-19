import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Post from "../components/Post.jsx";
import {IoArrowBackOutline} from "react-icons/io5";
import PostForm from "../components/PostForm.jsx";
import Loading from "../components/Loading.jsx";

const CurrentPost = () => {
  const navigate = useNavigate();
  const postId = useParams().id;

  const [post, setPost] = useState({});
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostAndReplies();
      setFinishedLoading(true);
    };
    fetchData();
  }, [postId]);

  const fetchPostAndReplies = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`)
      .then((response) => response.json())
      .then(async (data) => {
        const user = await fetchAuthorDetails(data.authorId);
        const { username, displayName, avatarUrl } = user;
        const postWithAuthor = { ...data, username, displayName, avatarUrl };
        setPost(postWithAuthor);
        const repliesWithAuthors = await Promise.all(
          data.replies.map(async (reply) => {
            const replyUser = await fetchAuthorDetails(reply.authorId);
            const { username, displayName, avatarUrl } = replyUser;
            return { ...reply, username, displayName, avatarUrl };
          }),
        );

        setReplies(repliesWithAuthors);
      });
  };

  const fetchAuthorDetails = async (authorId) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/id/${authorId}`,
    );
    return await response.json();
  };

  return (
    <div>
      <div className="px-4 flex h-[53px] items-center -ml-2">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-white/10 transition-colors p-2 rounded-full"
        >
          <IoArrowBackOutline size={20} />
        </button>
        <h2 className="text-[20px] font-bold ml-8">Post</h2>
      </div>
      {finishedLoading ? (
        <Post
          postId={post.id}
          text={post.text}
          imageUrl={post.imageUrl}
          displayName={post.displayName}
          username={post.username}
          createdAt={post.createdAt}
          likeCount={post._count ? post._count.likes : 0}
          replyCount={post._count ? post._count.replies : 0}
          avatarUrl={post.avatarUrl}
          isLiked={post.isLiked}
          isFull
        />
      ) : (
        <Loading />
      )}
      <PostForm replyId={postId} />
      {finishedLoading ? (
        replies.map((reply) => (
          <Post
            key={reply.id}
            postId={reply.id}
            text={reply.text}
            imageUrl={reply.imageUrl}
            displayName={reply.displayName}
            username={reply.username}
            createdAt={reply.createdAt}
            likeCount={reply._count ? reply._count.likes : 0}
            replyCount={reply._count ? reply._count.replies : 0}
            avatarUrl={reply.avatarUrl}
            isLiked={reply.isLiked}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CurrentPost;
