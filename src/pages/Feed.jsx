import Post from "../components/Post.jsx";
import { useEffect, useState } from "react";
import PostForm from "../components/PostForm.jsx";
import Loading from "../components/Loading.jsx";
import { useGetPostsQuery } from "../app/services/postApi.js";

const Feed = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
  const [activeSegment, setActiveSegment] = useState("forYou");

  useEffect(() => {
    refetch();
  }, [activeSegment, refetch]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="relative">
      <div className="w-full bg-black/50 backdrop-blur-2xl top-0 left-0 h-[53px] border-b-[1px] sticky border-blue-100/20 flex">
        {["forYou", "following"].map((segment) => (
          <button
            key={segment}
            className="flex-1 h-full flex items-center justify-center transition-colors hover:bg-white/10"
            onClick={() => setActiveSegment(segment)}
          >
            <h5
              className={
                activeSegment === segment ? "font-semibold" : "text-gray-500"
              }
            >
              <div className={activeSegment === segment ? "my-3" : undefined}>
                {segment === "forYou" ? "For you" : "Following"}
              </div>
              <div
                className={
                  activeSegment === segment
                    ? "border-color-1 border-b-4 rounded-full"
                    : undefined
                }
              ></div>
            </h5>
          </button>
        ))}
      </div>
      <PostForm />
      {posts.length > 0 ? (
        posts.slice().reverse().map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            text={post.text}
            imageUrl={post.imageUrl}
            displayName={post.author.displayName}
            username={post.author.username}
            avatarUrl={post.author.avatarUrl}
            createdAt={post.createdAt}
            likeCount={post._count.likes}
            replyCount={post._count.replies}
            isLiked={post.isLiked}
            authorId={post.authorId}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Feed;
