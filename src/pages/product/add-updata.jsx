import React from 'react'
import LinkBotton from '../../component/link-botton';
import { Card,Icon } from 'antd';

export default class ProductAddUpdate extends React.Component{
    render(){

        const title=(
            <span>
                <LinkBotton>
                    <Icon type='arrow-left'></Icon>
                </LinkBotton>
                <span>添加商品</span>
            </span>
        )
        return (
            <Card title={title} >
            
            
          </Card>
        )
    }
}