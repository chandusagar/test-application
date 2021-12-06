import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class S3 {

    constructor(){  
       
        // this.AWS_BASE_URL = `http://localhost:4004/s3`
        this.AWS_BASE_URL = `https://zvmsff2q64.execute-api.us-east-1.amazonaws.com/dev/s3`
    }
    
    getInfoFromAPI(subpath,params){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.AWS_BASE_URL}/${subpath}`,{ params: params })
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    postInfoToAPI(subpath,body){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.post(`${this.AWS_BASE_URL}/${subpath}`, body)
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

}