import axios from 'axios';
import UserPool from '../pages/auth/UserPool'

export default class Confluence {

    constructor(){

        this.CONFLUENCE_BASE_URL = `https://rm5xfddtl9.execute-api.us-east-1.amazonaws.com/dev`
        // this.CONFLUENCE_BASE_URL = `http://localhost:4007`
    }

    getFromServer(path,params){

        return new Promise((resolve,reject) => {

            let user = UserPool.getCurrentUser()
            axios.defaults.headers.common['token'] = user.username;
            axios.get(`${this.CONFLUENCE_BASE_URL}/${path}`, params)
                .then(response =>{

                    resolve(response);
                })
                .catch(error =>{

                    reject(error);
                })
        }) 
    }
}