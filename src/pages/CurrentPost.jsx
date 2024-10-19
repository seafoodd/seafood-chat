import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../app/services/postApi.js";
import Post from "../components/Post.jsx";
import { IoArrowBackOutline } from "react-icons/io5";
import PostForm from "../components/PostForm.jsx";
import Loading from "../components/Loading.jsx";

const CurrentPost = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) return <Loading />;
  if (error || post.deleted) return <div>Error loading post</div>;

  return (
    <div>
      <div className="px-4 w-full bg-black/50 backdrop-blur-2xl sticky top-0 left-0 flex h-[53px] items-center">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-white/10 transition-colors p-2 rounded-full -ml-2"
        >
          <IoArrowBackOutline size={20} />
        </button>
        <h2 className="text-[20px] font-bold ml-8">Post</h2>
      </div>
      <Post
        postId={post.id}
        text={post.text}
        imageUrl={post.imageUrl}
        displayName={post.author.displayName}
        username={post.author.username}
        createdAt={post.createdAt}
        likeCount={post._count ? post._count.likes : 0}
        replyCount={post._count ? post._count.replies : 0}
        avatarUrl={post.author.avatarUrl}
        isLiked={post.isLiked}
        isFull
        authorId={post.authorId}
      />
      <PostForm replyId={postId} />
      {post.replies.slice().reverse().map((reply) => (
        <Post
          key={reply.id}
          postId={reply.id}
          text={reply.text}
          imageUrl={reply.imageUrl}
          displayName={reply.author.displayName}
          username={reply.author.username}
          createdAt={reply.createdAt}
          likeCount={reply._count ? reply._count.likes : 0}
          replyCount={reply._count ? reply._count.replies : 0}
          avatarUrl={reply.author.avatarUrl}
          isLiked={reply.isLiked}
          authorId={reply.authorId}
        />
      ))}
    </div>
  );
};

export default CurrentPost;