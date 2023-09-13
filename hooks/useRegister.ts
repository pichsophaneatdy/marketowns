import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!
}
const userPool = new CognitoUserPool(poolData);

export const registerUser = async (username: string, email: string, password:string) => {

    return new Promise((resolve, reject) => {
        const attributeList = [];

        const dataEmail = {
            Name: "email",
            Value: email
        }
    
        const attributeEmail = new CognitoUserAttribute(dataEmail);
    
        attributeList.push(attributeEmail);
    
        userPool.signUp(username,password, attributeList, [], function(err, result) {
            if (err) {
                reject(err);
            } else {
                const cognitoUser = result?.user;
                resolve(cognitoUser?.getUsername());
            }
        })
    })
}

export const verifyUser = async(username: string, code: string) => {
    return new Promise((resolve, reject) => {
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}