import React from 'react'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import LinkBotton from '../link-botton'
import './index.less'



class Header extends React.Component{

    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl: '', // 天气图片url
        weather: '', // 天气的文本
    }
    //获取title
    getTitle=()=>{
        const path=this.props.location.pathname
        let title=''
          menuList.forEach(item => {
            if(item.key===path){
                title=item.title
            }else if(item.children){
                const cItem=item.children.find((cItem)=>cItem.key===path)
                if(cItem){
                    title=cItem.title
                }
                
            }
          });
       return title
    }
    //更新时间
    getTime=()=>{
       this.timer= setInterval(()=>{
           const currentTime=formateDate(Date.now())
            this.setState({currentTime})

        },1000)
    }

    //更新天气
    getWeather= async () =>{
        const {dayPictureUrl, weather}=await reqWeather('北京')
        this.setState({dayPictureUrl, weather})
    }

    componentDidMount(){
        this.getTime()
        this.getWeather()

    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
   
    render(){
        
        const title=this.getTitle()
        const {currentTime,dayPictureUrl, weather}=this.state
        return (
            <div className='header'> 
                <div className='header-top'>
                    <span>hello,admin</span>
                    <LinkBotton>退出</LinkBotton>

                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right' >
                    <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default withRouter(Header)