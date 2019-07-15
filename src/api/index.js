import ajax from './ajax'


const BASE=''

export function reqLogin(username,password){
    ajax({
        method:'post',
        url: '/login',
        data:{
            username,
            password
        }
    })
}
