import axios from "axios";

const api = axios.create({            //axios object create
  baseURL: "http://localhost:5000/api"
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {                    //it contain url headers body about the details

  const token = localStorage.getItem("token");               //interceptors is a middle man it stop the request every time before send to backend and check the token if exist then attach to header
      // If user already logged in.                                                  //request - every outgoing request.   use- function register. config - request details(url,body)
                                                         //request - every outgoing request.   use- function register. config - request details(url,body)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    //request details +Authorization: Bearer <token>
  }

  return config;
});

export default api;
