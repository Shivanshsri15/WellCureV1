import { Spinner } from "react-bootstrap";

const Loader = ({ loaderVariant }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
      variant={loaderVariant ? loaderVariant : "primary"}
    ></Spinner>
  );
};

export default Loader;
