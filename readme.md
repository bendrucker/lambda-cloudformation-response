# lambda-cloudformation-response [![Build Status](https://travis-ci.org/bendrucker/lambda-cloudformation-response.svg?branch=master)](https://travis-ci.org/bendrucker/lambda-cloudformation-response) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/lambda-cloudformation-response.svg)](https://greenkeeper.io/)

> Send a response from an [AWS Lambda](https://aws.amazon.com/lambda/) function in response to a [CloudFormation custom resource](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources-lambda.html) request


## Install

```
$ npm install --save lambda-cloudformation-response
```


## Usage

In your Lambda 

```js
var respond = require('lambda-cloudformation-response')

exports.handler = function (event, context) {
  doWork()
    .then(function (result) {
      return respond(event, context, 'SUCCESS', result)  
    })
}
```

## API

#### `respond(event, context, status, [data])` -> `promise`

##### event
##### context

*Required*  
Type: `object`

The event and context objects supplied by Lambda to a handler.

##### status

*Required*  
Type: `string`  
Values: `'SUCCESS', 'FAILURE'`

A CloudFormation resource status string.

##### data

Type: `object`

Optional data to return to CloudFormation as resource results. These results can be retrieved elsewhere in the stack using the `Fn::GetAtt` function.


## License

MIT © [Ben Drucker](http://bendrucker.me)
