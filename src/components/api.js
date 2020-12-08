import axios from "axios";

let api = axios.create({
  headers: {
    "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
    Authorization: `Bearer 0w13pjgl45gd9nnmjhhzaeg5iwan2x`,
  },
});

export default api;
