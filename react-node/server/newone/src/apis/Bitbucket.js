import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class Bitbucket {

    constructor(){  
       
        // this.BITBUCKET_BASE_URL = `http://localhost:4003`
        this.BITBUCKET_BASE_URL = `https://1edqm7qfrl.execute-api.us-east-1.amazonaws.com/dev`
        
    }
    
    getInfoFromAPI(subpath,params){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.BITBUCKET_BASE_URL}/${subpath}`,{ params: params })
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
            axios.post(`${this.BITBUCKET_BASE_URL}/${subpath}`, body)
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

}