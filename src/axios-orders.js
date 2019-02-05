import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-eatme-app.firebaseio.com/"
});

export default instance;
