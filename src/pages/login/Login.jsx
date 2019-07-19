import React from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button,message } from 'antd'
import {reqLogin} from '../../api/index'
import logo from '../../assets/images/logo.png'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import './login.less'

class Login extends React.Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, {username,password}) => {
            if (!err) {
              //alert(`发生ajax请求，username=${username}&password=${password}`)
              const result= await reqLogin(username,password)
              if(result.status===0){
                  
                  message.success('登录成功')
                  //保存到local中
                  const user=result.data
                 storageUtils.saveUser(user)
                 //保存到内存中
                 memoryUtils.user=user

                 this.props.history.replace('/')

              }else{
                //alert('登录失败')
                 message.error(result.msg)
            }
            }
          });
    }
    validatePwd=(rule, value, callback)=>{
        console.log('validatePwd()',value)
        value=value.trim()
        if(!value){
            callback('请输入密码')
        }else if(value.length<4){
            callback('密码必须大于4位')
        }else if(value.length>12){
            callback('密码必须小于12位')
        }else if(!/[a-zA-Z0-9_]+$/){
            callback('密码必须是英文、数字或下划线组成')
        }else {
            callback()
        }
    }
        render(){
            const user=memoryUtils.user
            if(user._id){
                return <Redirect to='/'/>
            }
            const { getFieldDecorator }=this.props.form
            return (
                <div className='login'>
                    <div className='login-header'>
                        <img src={logo} alt='logo'/>
                        <h1>React项目：后台管理系统</h1>
                    </div>
                    <div className='login-content'>
                        <h1>用户登录</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    /*
                                    用户名/密码的的合法性要求
                                        1). 必须输入
                                        2). 必须大于等于4位
                                        3). 必须小于等于12位
                                        4). 必须是英文、数字或下划线组成
                                    */
                                    getFieldDecorator ('username',{
                                        initialValue: '',
                                        rules:[{required:true,message:'请输入用户名'},
                                             {min:4,message:'用户名必须大于4位'},
                                             {max:12,message:'用户名必须小于12位'},
                                             {pattern:/[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                                        ]
                                    })(
                                        <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                        />

                                    )
                                }
                            
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator ('password',{
                                        initialValue: '',
                                        rules:[{validator:this.validatePwd}]
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                        /> 
                                    )
                                }
                            
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                     )
            }
        }
        const WrapLogin = Form.create()(Login)
        export default WrapLogin
