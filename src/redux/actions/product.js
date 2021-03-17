import axios from "../../services/Axios";
const { REACT_APP_URL } = process.env;

const getProduct = (param) => {
  const url = `${REACT_APP_URL}product?${param}`;
  return {
    type: "GETPRODUCT",
    payload: axios().get(url),
  };
};

export { getProduct };
