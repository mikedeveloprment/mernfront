import axios from "axios";

const instance = axios.create({
  baseURL: "https://mernbackend1.herokuapp.com"
})

instance.interceptors.request.use((config)=> {
  config.headers.authorization = window.localStorage.getItem("token-sign")
  return config
})


export default instance