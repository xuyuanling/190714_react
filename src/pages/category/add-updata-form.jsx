import React from 'react'
import {Form,Input} from 'antd'

class AddUpdataForm extends React.Component{

    
    render(){
        this.props.setForm(this.props.form)
        const { getFieldDecorator } = this.props.form
        const {categoryName}=this.props
        return(
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName||'',
                            rules:[ {required: true, message:'请输入分类名称'} ]})(
                            <Input type='text' placeholder='请输入'/>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddUpdataForm)