import Post from "../components/Post.jsx";
import { useEffect, useState } from "react";

const Feed = () => {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
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
  }, []);

  const fetchAuthorDetails = async (authorId) => {
    const response = await fetch(
      `http://localhost:5000/api/users/id/${authorId}`,
    );
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <div className="w-full h-[150px]"></div>
      {posts.map((post) => (
        <Post
          key={post.id}
          text={post.text}
          imageUrl={post.imageUrl}
          displayName={post.displayName}
          username={post.username}
          createdAt={post.createdAt || "1"}
          likeCount={post._count.likes}
          replyCount={post._count.replies}
          avatarUrl={post.avatarUrl}
        />
      ))}
    </div>
  );
};

export default Feed;
