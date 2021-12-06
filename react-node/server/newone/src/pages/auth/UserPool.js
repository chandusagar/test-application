import { CognitoUserPool } from 'amazon-cognito-identity-js' 

const poolData ={
    UserPoolId : "us-east-1_78bDZcTgJ",
    ClientId : "5ltvj5fktsn9mgqkdgic1db63m"
}

export default new CognitoUserPool(poolData)