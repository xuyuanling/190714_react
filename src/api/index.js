import jsonp from 'jsonp'
import ajax from './ajax'




const BASE=''

export const reqLogin=(username,password)=>ajax.post(BASE+'/login',{username,password})
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

