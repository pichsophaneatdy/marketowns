import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.AWS_CONGITO_POOL_ID!,
    ClientId: process.env.AWS_CONGITO_CLIENT_ID!
}
const userPool = new CognitoUserPool(poolData);

export const registerUser = (username: string, email: string, password:string) => {
    const attributeList = [];

    const dataEmail = {
        Name: "email",
        Value: email
    }

    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(username,password, attributeList, [], function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result?.user;
        console.log('user name is ' + cognitoUser?.getUsername());
    })
}