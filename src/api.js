import axios from "axios";

let api = axios.create({
    headers:{
        "Client-ID": `${process.env.REACT_APP_CLIENTID}`,
        "Authorization": `Bearer ${process.env.REACT_APP_OAUTHTOKEN}` 
    }
});

export default api;