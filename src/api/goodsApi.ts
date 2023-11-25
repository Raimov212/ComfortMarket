import axios from "axios";

export const getGoodsApi = axios.create({
  baseURL: "https://comfortmarket.uz/php",
  headers: {
    "Content-type": "application/json",
  },
});
