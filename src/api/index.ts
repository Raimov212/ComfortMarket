import axios from "axios";

const api = axios.create({
  baseURL: "http://64.23.155.56:8088",
  withCredentials: true,
});

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";

    return config;

    // return {
    //   ...config,
    //   headers: {
    //     ...(token !== null && { Authorization: `${token}` }),
    //     ...config.headers,
    //   },
    // };
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //(`unauthorized :)`);
      localStorage.removeItem("token");
      //removeLocalStorageToken
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
