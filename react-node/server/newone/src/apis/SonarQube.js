import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class SonarQube {

    constructor(){

        this.SONAR_BASE_URL = `https://vwkxhbzuae.execute-api.us-east-1.amazonaws.com/dev`
        // this.SONAR_BASE_URL = `http://localhost:4006`
    }
    
    fetchPostFromAPI(path,data){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            let URL = `${this.SONAR_BASE_URL}/${path}`
            axios.post(URL,data)
                .then(response =>{

                    resolve(response.data);
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
            axios.get(`${this.SONAR_BASE_URL}/${path}`, params)
                .then(response =>{

                    resolve(response.data);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }
}