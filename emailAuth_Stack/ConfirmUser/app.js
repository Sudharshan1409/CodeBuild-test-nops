
            let response;
            const aws = require('aws-sdk');
            const dynamoDB = new aws.DynamoDB.DocumentClient();
            const UserTable = process.env.userinfoTable
            
            async function addUserData(userData) {
                try {
                        console.log("[INFO] addUserData input",userData)
                        const params = {
                                        TableName: UserTable,
                                        Item: userData
            
                        };
                        var Items  = await dynamoDB.put(params).promise();
                        console.log("[INFO] addUserData output",Items)
                        return Items
            
                } 
                catch (err) {
                        throw err;
                }
            }
            exports.lambdaHandler = async (event, context) => {
                try {
                    if(event.body!==undefined){
                        event=JSON.parse(event.body)
                    }
                    const cognito = new aws.CognitoIdentityServiceProvider();
                    var params = {
                                    ClientId: "3p6cqj50cvn3596p44c8ck1s1e",
                                    ConfirmationCode: event.Code,
                                    Username: event.emailId
              }
                   let res=await cognito.confirmSignUp(params).promise();
                    
                    var params1 = {
                                    UserPoolId: "ap-south-1_1yC44cNIk",
                                   AttributesToGet: ["email","name","sub"],
                                   
              }
              
                    
                    res=await cognito.listUsers(params1).promise();
                    let user={}
                    let Attributes={}
                    res["Users"].map(ele=>{
                        
                        Attributes = ele["Attributes"].find(ele=>ele.Name==="email"&&ele.Value==event.emailId)
                        if (Attributes!==undefined) {
                            ele["Attributes"].map(ele=>{
                                user[ele.Name]=ele.Value
                            })
                        }
                        
            
                    })
                    console.log(user)
                    await addUserData(user)
                    response = {
                        'statusCode': 200,
                        'body': JSON.stringify({
                            message: res,
                           
                        })
                    }
                // await addUserData()
                } catch (err) {
                    console.log(err);
                    response = {
                        'statusCode': 200,
                        'body': JSON.stringify(err)
                        }
                }
            
                return response
            };
            