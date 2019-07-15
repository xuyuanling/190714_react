// 封装发送ajax的请求的函数
import axios from 'axios'
import qs from 'qs'


//拦截请求体
axios.interceptors.request.use(function (config) {
    const {method,data}=config
    if(method.toLowerCase()==='post'&&typeof data==='object'){
        config.data=qs.stringify(data)
    }
    return config
  } )


  //拦截响应体
  axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
      alert('请求出错')
    return new Promise(()=>{})
  });

export default axios
