import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <container className="flex max-w-screen-xl mx-auto min-h-[100vh]">{children}</container>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
