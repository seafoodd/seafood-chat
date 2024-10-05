import Post from "../components/Post.jsx";
import {useEffect, useState} from "react";
import {mockPosts} from "../constants/index.js";

const Feed = () => {
  let [posts, setPosts] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => setPosts(data.slice(0, 5)));
  }, []);


  return (
    <div>
      {/* TODO: replace with post form */}
      <div className="w-full h-[150px]"></div>
      {mockPosts.map((post) => (
        <Post key={post.id} text={post.text} image={post.imageUrl} />
      ))}
      {posts && posts.map((post) => (
        <Post key={post.id} text={post.title} image={post.url} />
      ))}
    </div>
  );
};

export default Feed;
