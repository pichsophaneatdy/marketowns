import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    ICognitoUserPoolData,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!
}
export const userPool = new CognitoUserPool(poolData);

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

export const loginUser = async(username: string, password: string) => {
    return new Promise((resolve, reject) => {
        const authenticationData = {
            Username: username,
            Password: password
        }
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        )
        const userData = {
            Username: username,
            Pool: userPool
        }
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                resolve(result);
            },
            onFailure: function(err) {
                reject(err);
            }, 
        })
    })
}

export const getCurrentUser = async(): Promise<{username: string, idToken: any}> => {
    return new Promise((resolve, reject) => {
        const cognitorUser = userPool.getCurrentUser();
        if(cognitorUser != null) {
            cognitorUser.getSession(function(err:any, session:any) {
                if(err) {
                    reject(err);
                }
                resolve({username: cognitorUser.getUsername(), idToken: session.getIdToken().getJwtToken()});
            })
        } else {
            reject(new Error("Not Authenticated"));
        }
    })
}

export const logout = async() => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();
        if(cognitoUser != null) {
            cognitoUser.signOut();
        }
    })
}

export const getUsername = async(): Promise<string> => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();
        if(cognitoUser != null) {
            resolve(cognitoUser.getUsername())
        } else {
            reject({message: "User not found or not authenticated."})
        }
            
        
    })
}