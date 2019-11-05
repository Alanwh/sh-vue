import axios from 'axios'

const http = axios.create({
  withCredentials: true // send cookies when cross-domain requests
})
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 拦截
http.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default http
