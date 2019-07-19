import React from 'react'
import {Card,Button,Select,Input,Icon,Table, message} from 'antd'
import {reqProducts, reqSearchProduct, reqUpdataStatus} from '../../api'
import LinkButton from '../../component/link-botton'
import memoryUtils from '../../utils/memoryUtils'
const { Option } = Select;

export default class ProductHome extends React.Component{


    state={
        products:[],
        total:0,
        searchName:'',
        searchType:'productName'
    }


    //获取、搜索商品列表
    getProducts=async(pageNum)=>{
      this.pageNum=pageNum
      let result
      const{ searchName,searchType}=this.state
       if(!searchName){
           result = await reqProducts(pageNum,2)
       }else{
           result= await reqSearchProduct(pageNum,2,searchName,searchType)
       }

        
        if(result.status===0){
            const {total,list}=result.data
            console.log(result)
            this.setState({
                products:list,
                total})
        }
        
    }


    //更新商品状态
    updataStatus=async(productId,status)=>{
      status=status===2? 1:2
      const result= await reqUpdataStatus(productId,status)
      this.getProducts(this.pageNum)
       if(result.status===0){
        message.success('更新商品状态成功')
      }else{
        message.error('更新商品状态失败')
      }
      
    }

    initColumns=()=>{
      this.columns = [
        {
            title: '商品名称',
            dataIndex: 'name'
          },
          {
            title: '商品描述',
            dataIndex: 'desc'
          },
          {
            title: '价格',
            dataIndex: 'price',
            // width:200,
            render: (price) => '¥' + price
          },
          {
              title:'状态',
              // dataIndex:'status',
              width:100,
              render:({_id,status})=>{
                let btnText='下架'
                let text='在售'
                if(status===2){
                  btnText='上架'
                  text='已售罄'
                }
                return(
                  <span>
                    <Button type='primary' onClick={()=>this.updataStatus(_id,status)}>{btnText}</Button><br/>
                    <span>{text}</span>
                  </span>

                )

                
                }
          },
          {
              title:'操作',
              width:100,
              render:(product)=>(
                  <span>
                      <LinkButton 
                      onClick={()=>{
                        memoryUtils.product=product
                        this.props.history.push('/product/detail')}}>详情</LinkButton><br/>
                      <LinkButton>修改</LinkButton>
                  </span>
              )

          }
      ];
      
    }

    componentWillMount(){
      this.initColumns()
    }

    componentDidMount(){
        this.getProducts(1)
        
    }

    render(){

        const {products,total,searchName,searchType}=this.state
        const title=(
            <div>
               <Select style={{ width: 150 }} 
                value={searchType}
                onChange={(value)=>this.setState({searchType:value})}
                >
                  <Option value="productName">按名称搜索</Option>
                  <Option value="productDesc">按描述搜索</Option>
               </Select>
               <Input placeholder='关键字' 
               style={{width:150,margin:'0 10px'}} 
               value={searchName}
               onChange={event=>this.setState({searchName:event.target.value})}/>
               <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
            </div>
           )
      
           const extra=(
             <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
               <Icon type='plus' ></Icon>
               添加商品
             </Button>
           )


           
          
          
          return (
            <Card title={title} extra={extra} >
            <Table
                columns={this.columns}
                rowKey="_id"
                dataSource={products}
                bordered
                pagination={{
                    total,
                    defaultPageSize: 2,
                    showQuickJumper: true,
                    onChange: this.getProducts,
                    current:this.pageNum
                  }}
            />
            
          </Card>
          )
        }
    
}
