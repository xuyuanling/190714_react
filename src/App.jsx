import React,{Component} from 'react'
import {HashRouter,BrowserRouter,Switch,Route} from 'react-router-dom'
import {Button, message} from 'antd'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
/*
应用根组件
 */

export default class App extends Component{
    
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
       
        
    }
}