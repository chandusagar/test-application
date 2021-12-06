import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class JenkinsAPI {

    constructor(){

        this.JENKINS_BASE_URL = `https://g2nstqkw78.execute-api.us-east-1.amazonaws.com/dev`
        // this.JENKINS_BASE_URL = `http://localhost:4001`
    }
    
    fetchPostFromAPI(path,data){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            let URL = `${this.JENKINS_BASE_URL}/${path}`
            axios.post(URL,data)
                .then(response =>{

                    resolve(response);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    fetchGetFromAPI(path,params){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.JENKINS_BASE_URL}/${path}`, params)
                .then(response =>{

                    resolve(response);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    putDatatoAPI(path,data){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.put(`${this.JENKINS_BASE_URL}/${path}`,data)
                .then(response =>{

                    resolve(response);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }

    deleteDatafromAPI(path,data){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.delete(`${this.JENKINS_BASE_URL}/${path}`, { data })
                .then(response =>{

                    resolve(response);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }
}