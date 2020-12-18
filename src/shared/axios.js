import axios from "axios";

const baseURL = process.env.NODE_ENV !== "production" ? "https://api-test.instakash.net/api" : "https://api-prod.instakash.net/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 20000,
});

const requestLog = (config) => (process.env.NODE_ENV !== "production" ? console.log(`Request sent to ${config.url}`) : false);

axiosInstance.interceptors.request.use(
  (config) => {
    requestLog(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);
    console.warn("Error status", error.response ? error.response.status : error.code);

    let message = "Ha ocurrido un error inesperado, por favor intenta más tarde, si el problema persiste contacte a soporte.";

    if (error.code === "ECONNABORTED") {
      message = "Se ha agotado el tiempo de espera, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";
    }

    if (error.response) {
      error.response.message = message;
      return Promise.reject(error.response);
    } else {
      error.message = message;
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
