import jsonp from 'jsonp'
import ajax from './ajax'




const BASE=''
//发送登录
export const reqLogin=(username,password)=>ajax.post(BASE+'/login',{username,password})
//发送天气请求
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(error,data)=>{
        if(!error&&data.error===0){
            const {dayPictureUrl, weather} = data.results[0].weather_data[0]
            resolve({dayPictureUrl,weather})
        }else {
            alert('天气获取失败')
        }
    })
    })
}
//发送分类列表请求
export const reqCategorys=()=>ajax(BASE+'/manage/category/list')

//添加列表请求
export const reqAddCategory=(categoryName)=>ajax.post(BASE+'/manage/category/add',{categoryName})

//修改列表请求
export const reqUpdataCategory=(categoryId,categoryName)=>ajax.post(BASE+'/manage/category/update',{categoryId,categoryName})

//获取商品列表请求
export const reqProducts=(pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{params:{pageNum,pageSize}})

