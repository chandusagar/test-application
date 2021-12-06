import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class Jira {

    constructor(){

        this.JIRA_BASE_URL = `https://t6yf00kv4c.execute-api.us-east-1.amazonaws.com/dev`
        // this.JIRA_BASE_URL = `http://localhost:3005/jira`
    }

    getFromServer(path,params){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.JIRA_BASE_URL}/${path}`, params)
                .then(response =>{

                    resolve(response);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }
}