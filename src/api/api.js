import axios from "axios";
function Instance() {
  let instance = axios.create({
    baseURL: "http://localhost:9999/api",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
// axios 객체 생성
export  { Instance };
