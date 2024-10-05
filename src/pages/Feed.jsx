import Post from "../components/Post.jsx";

const Feed = () => {
  return (
    <div className="">
      {/* TODO: replace with post form */}
      <div className="w-full h-[150px]"></div>
      <Post
        image={
          "https://pbs.twimg.com/media/GZCHMxMX0AAq2Af?format=jpg&name=small"
        }
      />
      <Post
        text="all i need rn"
        image="https://pbs.twimg.com/media/GZA4hCWbsAA1aPc?format=jpg&name=small"
      />
      <Post
        text="why neck hurt"
        image="https://pbs.twimg.com/media/GZCw0lZWsAAu8E0?format=jpg&name=small"
      />
    </div>
  );
};

export default Feed;
