import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal, message} from 'antd'
import {reqCategorys,reqAddCategory,reqUpdataCategory} from '../../api'
import LinkButton from '../../component/link-botton'
import AddUpdataForm from './add-updata-form'


/**
 * 分类管理
 */
export default class Category extends Component {
  state={
    categorys:[],
    showStatus:0
  }


  //获取分类列表数据
  getCatagorys=async()=>{
    const result=await reqCategorys()
    const categorys=result.data
    this.setState({categorys})
  }
  //初始化colums
  initColumns=()=>{
   this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render: (category)=><LinkButton onClick={()=>{
          this.category=category
          this.setState({showStatus:2})
        }}>修改分类</LinkButton>
      },
      
    ];
  }
  //点击确定回调
  handleOk=()=>{
    const {showStatus}=this.state
    //表单统一验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //添加数据成功后重新设置初始值为空
         this.form.resetFields()
        const {categoryName}=values
        let result
        if(showStatus===1){
            result=await reqAddCategory(categoryName)
            
        }else{
          const categoryId= this.category._id
          result=await reqUpdataCategory(categoryId,categoryName)
          
        }
              this.setState({showStatus:0})

              const action= showStatus===1? '添加':'修改'
              if(result.status===0){
                this.getCatagorys()
                message.success(action+'分类成功')
                this.category={}
                
              }else{
                message.error(action+'分类失败')
              }
          
      }
    });
    

   

  }

  //点击删除回调
  handleCancel=()=>{
    this.category={}
    this.setState({showStatus:0})

  }


  componentWillMount(){
    this.initColumns()

  }
  componentDidMount(){
    this.getCatagorys()
  }

  render() {

    const{ categorys,showStatus}=this.state
    const category=this.category || {}


    const extra=(
        <Button type='primary' onClick={()=>{
          this.setState({showStatus:1})
        }}>
          <Icon type='plus' ></Icon>
          添加
        </Button>
    )
      
    
    
    return (
      <Card  extra={extra}>
      <Table
        columns={this.columns}
        dataSource={categorys}
        bordered
       />
       <Modal
          title={showStatus===1?'添加分类':'修改分类'}
          visible={showStatus!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUpdataForm setForm={form=>this.form=form } categoryName={category.name}/>
        </Modal>
    </Card>
    )
  }
}
