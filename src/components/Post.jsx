import { GoComment, GoHeart } from "react-icons/go";
import PropTypes from "prop-types";

const Post = ({ image, text }) => {
  return (
    <div className="px-2 flex border-b-[1px] border-blue-100/20 py-2">
      <div className="w-10 mr-2">
        <img
          className="w-10 h-10 rounded-full mt-1"
          src="https://cdn.prod.website-files.com/62bdc93e9cccfb43e155104c/654f681fe7863217b0356c7d_Cute%2520PFP%2520for%2520Tiktok%252049.png"
          alt=""
        />
      </div>
      <div className='text-[15px]'>
        <div className="flex mb-0.5">
          <h5>Username</h5>
          &nbsp;
          <h5 className="text-gray-500">@username</h5>
          <div className="mx-1 text-gray-500">&middot;</div>
          <h5 className="text-gray-500">Oct 4</h5>
        </div>
        {text && (
          <h6 className="text-start max-w-[516px]">{text}</h6>
        )}
        {image && (
          <div className="mt-3">
            <img
              className="max-h-[520px] max-w-[516px] rounded-2xl"
              src={image}
              alt=""
            />
          </div>
        )}
        <div className="text-[13px]">
          <div className="mt-3 flex gap-16 text-gray-500">
            <div className="flex items-center gap-1">
              <GoHeart size={18} />
              <h6>108</h6>
            </div>
            <div className="flex items-center gap-1">
              <GoComment size={18} />
              <h6>4.6K</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
}

export default Post;
