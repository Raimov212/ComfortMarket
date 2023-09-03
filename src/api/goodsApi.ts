import axios from "axios";

export const getGoodsApi = axios.create({
  baseURL: "http://comfortmarket.uz/php",
  headers: {
    "Content-type": "application/json",
  },
});
