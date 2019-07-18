import React from 'react'
import {Card,Button,Select,Input,Icon,Table} from 'antd'
import {reqProducts} from '../../api'
import LinkButton from '../../component/link-botton'
const { Option } = Select;

export default class ProductHome extends React.Component{


    state={
        products:[],
        total:0
    }


    getProducts=async(pageNum)=>{

        const result = await reqProducts(pageNum,2)
        if(result.status===0){
            const {total,list}=result.data
            console.log(result)
            this.setState({
                products:list,
                total})
        }
        
         // 取出数据
    //   const { total, list } = result.data
    //   // 更新状态
    //   this.setState({
    //     products: list,
    //     total
    //   })
    }

    componentDidMount(){
        this.getProducts(1)
        
    }

    render(){

        const {products,total}=this.state
        const title=(
            <div>
               <Select style={{ width: 200 }}  value='1'>
                  <Option value="1">按名称搜索</Option>
                  <Option value="2">按描述搜索</Option>
               </Select>
               <Input placeholder='关键字' style={{width:200,margin:10}}/>
               <Button type='primary'>搜索</Button>
            </div>
           )
      
           const extra=(
             <Button type='primary'>
               <Icon type='plus' ></Icon>
               添加商品
             </Button>
           )


           const columns = [
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
                render: (price) => '¥' + price
              },
              {
                  title:'状态',
                  dataIndex:'status'
              },
              {
                  title:'操作',
                  render:()=>(
                      <span>
                          <LinkButton>详情</LinkButton>
                          <LinkButton>修改</LinkButton>
                      </span>
                  )

              }
          ];
          
          
          
          return (
            <Card title={title} extra={extra} >
            <Table
                columns={columns}
                rowKey="_id"
                dataSource={products}
                bordered
                pagination={{
                    total,
                    defaultPageSize: 2,
                    showQuickJumper: true,
                    onChange: this.getProducts
                  }}
            />
            
          </Card>
          )
        }
    
}
