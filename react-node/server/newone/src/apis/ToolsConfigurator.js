import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class ToolsConfigurator {

    constructor(){  
       
        this.Tools_BASE_URL = `https://k7ydt76j4e.execute-api.us-east-1.amazonaws.com/dev`
        // this.Tools_BASE_URL = `http://localhost:4000`
    }
    
    getInfoFromAPI(subpath,params){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.Tools_BASE_URL}/${subpath}`,{ params: params })
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    getToolsListOnType(Tool_Type){
        

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.Tools_BASE_URL}/tooltype` , { params: { tool_type: Tool_Type } })
                .then(response =>{

                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        })
    }

    postTokensToServer(subpath , body){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.post(`${this.Tools_BASE_URL}/${subpath}`, body)
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    deleteTokenFromServer(body){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.delete(`${this.Tools_BASE_URL}/`, { data : body})
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    postInfoToAPI(subpath , body){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.post(`${this.Tools_BASE_URL}/${subpath}`, body)
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    putInfoToAPI(subpath , body){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.put(`${this.Tools_BASE_URL}/${subpath}`, body)
                .then(response =>{
                    
                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    fetchChannelList(subpath,body){
        
        return new Promise((resolve,reject) =>{            
            axios.get(`${this.Tools_BASE_URL}/${subpath}`,{ params: { token_type: body } })
            .then(response =>{
                resolve(response.data);
            })
            .catch(error =>{

                reject(error);
            })
        })
    }
    postChannel(subpath,data){
        return new Promise((resolve,reject) =>{            
            axios.post(`${this.Tools_BASE_URL}/${subpath}`,data)
            .then(response =>{
                resolve(response.data);
            })
            .catch(error =>{

                reject(error);
            })

        })
    }
}