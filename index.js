'use strict'

const got = require('got')

module.exports = respond

function respond (event, context, status, data) {
  return got.put(event.ResponseURL, {
    body: JSON.stringify({
      Status: status,
      Reason: 'CloudWatch: ' + context.logStreamName,
      PhysicalResourceId: context.logStreamName,
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
      Data: data
    }),
    headers: {
      'content-type': ''
    },
    json: true
  })
}
