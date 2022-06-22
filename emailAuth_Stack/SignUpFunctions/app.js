
            let response;
                const aws = require('aws-sdk');

                exports.lambdaHandler = async (event, context) => {
                    try {
                        if(event.body!==undefined){
                            event=JSON.parse(event.body)
                        }
                        // const ret = await axios(url);
                        const cognito = new aws.CognitoIdentityServiceProvider();
                        const params = {
                            ClientId: "3p6cqj50cvn3596p44c8ck1s1e",
                            Username:event.emailId,
                            Password: event.Password,
                            UserAttributes:[
                            {
                    Name: 'email',
                    Value: event.emailId,
                    },
                    {
                    Name: "name",
                    Value: event.name
                    }]
                        };
                        console.log(params)
                        let res=await cognito.signUp(params).promise();
                        response = {
                            'statusCode': 200,
                            'body': JSON.stringify(res)
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