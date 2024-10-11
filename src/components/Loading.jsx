import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <Oval
        height="30"
        width="30"
        strokeWidth={6}
        color="#1d9bf0"
        secondaryColor="#203b78"
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default Loading;
