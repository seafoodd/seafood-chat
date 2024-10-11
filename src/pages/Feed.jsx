import Post from "../components/Post.jsx";
import {useEffect, useState} from "react";
import PostForm from "../components/PostForm.jsx";
import Loading from "../components/Loading.jsx";

const Feed = () => {
  const [activeSegment, setActiveSegment] = useState("forYou");
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([]);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then((response) => response.json())
      .then(async (data) => {
        const postsWithAuthors = await Promise.all(
          data.map(async (post) => {
            const user = await fetchAuthorDetails(post.authorId);
            const { username, displayName, avatarUrl } = user;
            return { ...post, username, displayName, avatarUrl };
          }),
        );
        console.log(postsWithAuthors);
        setPosts(postsWithAuthors);
      });
  }, [activeSegment]);

  const fetchAuthorDetails = async (authorId) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/id/${authorId}`,
    );
    return await response.json();
  };

  return (
    <div className="relative">
      <div className="w-full bg-black/80 backdrop-blur-2xl top-0 left-0 h-[53px] border-b-[1px] sticky border-blue-100/20 flex">
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
              <div className={activeSegment === segment && "my-3"}>
                {segment === "forYou" ? "For you" : "Following"}
              </div>
              <div
                className={
                  activeSegment === segment &&
                  "border-color-1 border-b-4 rounded-full"
                }
              ></div>
            </h5>
          </button>
        ))}
      </div>
      <PostForm />
      {posts.length > 0 ? (
        posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              text={post.text}
              imageUrl={post.imageUrl}
              displayName={post.displayName}
              username={post.username}
              createdAt={post.createdAt}
              likeCount={post._count.likes}
              replyCount={post._count.replies}
              avatarUrl={post.avatarUrl}
            />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Feed;
