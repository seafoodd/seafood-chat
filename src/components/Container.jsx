import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="flex max-w-screen-xl mx-auto min-h-[100vh]">{children}</div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
