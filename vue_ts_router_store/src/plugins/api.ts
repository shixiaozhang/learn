import https  from './http';

export const Logins={
     login(params: any){
        return  https.get('http://192.168.3.115:5002/department_hot',params)
      }
}