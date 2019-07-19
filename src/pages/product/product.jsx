import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from './add-updata'
import './product.less'

/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return(
      <Switch >
        <Route path='/product' exact component={ProductHome}></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Redirect to='/product'/>
      </Switch> 
    )
    
  
  }
}
