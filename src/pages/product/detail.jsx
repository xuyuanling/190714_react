import React from 'react'
import {Card,Table,Icon,List} from 'antd'
import LinkBotton from '../../component/link-botton'
import memoryUtils from '../../utils/memoryUtils'
import { reqCategory } from '../../api'
const Item=List.Item

export default class ProductDetail extends React.Component{


    state={
        categoryName:''
    }

    getCategory=async(categoryId)=>{
        const result = await reqCategory(categoryId)
        if(result.status===0){
            console.log(result)
            const categoryName=result.data.name
            this.setState({categoryName})
        }
    }

    componentDidMount(){
        const product=memoryUtils.product
        if(product._id){
            this.getCategory(product.categoryId)
        }
        
    }
    render(){

        const title=(
            <span>
                <LinkBotton>
                    <Icon type='arrow-left'/>
                </LinkBotton>
                 商品详情
            </span>
        )
        const product=memoryUtils.product
        const {categoryName}=this.state

        return (
            <Card title={title}  >
            <List className='detail'>
                <Item>
                    <span className="detail-left">商品名称:</span>
                    <span>{product.name}</span>
                </Item>
                <Item>
                    <span className="detail-left">商品描述:</span>
                    <span>{product.desc}</span>
                </Item>
                <Item>
                    <span className="detail-left">商品价格:</span>
                    <span>{product.price}元</span>
                </Item>
                <Item>
                    <span className="detail-left">所属分类:</span>
                    <span>{categoryName}</span>
                </Item>
                <Item>
                    <span className="detail-left">商品图片:</span>
                    <span>商品图片</span>
                </Item>
                <Item>
                    <span className="detail-left">商品详情:</span>
                    <span>商品详情</span>
                </Item>
            </List>
            
          </Card>
        )
    }
}