
            let response;
            const aws = require('aws-sdk');
            exports.lambdaHandler = async (event, context) => {
                try {
                    if(event.body!==undefined){
                        event=JSON.parse(event.body)
                    }
                    const cognito = new aws.CognitoIdentityServiceProvider();
                    var params = {
                                    ClientId: "3p6cqj50cvn3596p44c8ck1s1e",
                                    ConfirmationCode: event.Code,
                                    Username: event.emailId,
                                    Password:  event.password, /* required */
              }
              let res=await cognito.confirmForgotPassword(params).promise();
                    response = {
                        'statusCode': 200,
                        'body': JSON.stringify({
                            message: res,
                           
                        })
                    }
                } catch (err) {
                    console.log(err);
                    response = {
                        'statusCode': 200,
                        'body': JSON.stringify(err)
                        }
                }
            
                return response
            };
            