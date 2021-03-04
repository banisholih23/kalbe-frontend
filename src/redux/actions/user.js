import axios from "../../services/Axios";
const { REACT_APP_URL } = process.env;

const getUser = (param) => {
  const url = `${REACT_APP_URL}user?${param}`;
  return {
    type: "GETUSER",
    payload: axios().get(url),
  };
};

export { getUser };
