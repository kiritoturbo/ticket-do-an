import axios from "axios";

// export default axios.create({
//   baseURL: 'http://localhost:2020',
// })
export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});
