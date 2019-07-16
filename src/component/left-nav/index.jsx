import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Menu, Icon, Button } from 'antd';
import meauList from '../../config/menuConfig'

const { SubMenu } = Menu;

 class LeftNav extends React.Component{


    //map 方法
    getMeauList1=(meauList)=>{
        return meauList.map((item)=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                        
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                       {this.getMeauList(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    //reduce方法
    getMeauList2=(meauList)=>{
        const path=this.props.location.pathname
        return meauList.reduce((pre,item)=>{
            if(!item.children){
                 pre.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                            
                        </Menu.Item>
                    )
            }else{

                const cItem=item.children.find((cItem)=>cItem.key===path)
                if(cItem){
                   this.openKey=item.key
                }
                 pre.push(
                        <SubMenu
                            key={item.key}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                            }
                        >
                        {this.getMeauList2(item.children)}
                        </SubMenu>
                    )
                  }
            return pre
         },[])
    }
    componentWillMount(){
        this.menuNode=this.getMeauList2(meauList)
    }
    render(){
        
        const path=this.props.location.pathname
        const openKey=this.openKey
        
        return( 
            <div className="left-nav">
                <div className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </div>
                <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
                >
                {this.menuNode}
                
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)