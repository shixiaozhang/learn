import http from './axios'

export const Logins={
     login(params:any){
        return  http.get('/login',params)
      }
}