'use strict'

const test = require('blue-tape')
const nock = require('nock')
const respond = require('./')

test(function (t) {
  t.plan(3)

  nock('http://fake.bucket')
    .matchHeader('content-length', function (value) {
      t.ok(value, 'has content-length')
      return true
    })
    .matchHeader('content-type', function (value) {
      t.notOk(value, 'has no content-type')
      return true
    })
    .put('/path', function (body) {
      t.deepEqual(body, {
        Status: 'SUCCESS',
        Reason: 'CloudWatch: ls',
        PhysicalResourceId: 'ls',
        StackId: 'stack',
        RequestId: 'req',
        LogicalResourceId: 'logical',
        Data: {foo: 'bar'}
      })

      return true
    })
    .reply(200)

  const event = {
    ResponseURL: 'http://fake.bucket/path',
    StackId: 'stack',
    RequestId: 'req',
    LogicalResourceId: 'logical'
  }

  const context = {
    logStreamName: 'ls'
  }

  const status = 'SUCCESS'
  const data = {foo: 'bar'}

  return respond(event, context, status, data)
})
