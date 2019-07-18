import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductAddUpdate from './detail'
import ProductDetail from './add-updata'

/**
 * 商品管理
 */
export default class Product extends React.Component {
  render() {
    return(
      <Switch >
        <Route path='/product' component={ProductHome}></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Redirect to='/product'/>
      </Switch> 
    )
    
  
  }
}
