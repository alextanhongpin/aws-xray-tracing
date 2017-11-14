const express = require('express')
const AWSXRay = require('aws-xray-sdk')

// Service plugins. Use plugins to record information about the service hosting your application
AWSXRay.config([
    AWSXRay.plugins.EC2Plugin,
    AWSXRay.plugins.ElasticBeanstalkPlugin
])

// Tracing AWS SDK Calls with the X-Ray SDK for nodejs
const AWS = AWSXRay.captureAWS(require('aws-sdk'))

// To instrument individual clients, wrap you AWS SDK client in a call to 
// AWSXRay.captureAWSClient.
// const ddb = AWSXRay.captureAWSClient(new AWS.DynamoDB())

const app = express()
const port = 3000

// Tracing SQL Queries with X-Ray SDK for node.js
// Unfortunately there is still no support for mysql2
const mysql = AWSXRay.captureMySQL(require('mysql'))

// Tracing incoming requests with the X-Ray SDK for nodejs
app.use(AWSXRay.express.openSegment('MyApp'))

app.get('/', (req, res) => {
    // Custom Subsegments
    AWSXRay.captureAsynFunc('send', (subsegment) => {
        res.status(200).json({
            message: 'ok'
        })
        subsegment.close()
    })
})

// @Annotations
// Annotations are key-value pairs with string, number, or Boolean values. Annotations are indexed for use with filter expressions. Use annotations to record data that you want to use to group traces in the console, or when calling the GetTraceSummaries API.
// const document = AWSXRay.getSegment()
// document.addAnnotation('myKey', 'myValue')

// @Metadata
// Metadata are key-value pairs that can have values of any type, including objects and lists, but are not indexed for use with filter expressions. Use metadata to record additional data that you want stored in the trace but don't need to use with search.
// const document = AWSXRay.getSegment()
// document.addMetadata('my key', 'my value', 'optional namespace')

app.use(AWSXRay.express.closeSegment())

app.listen(port, () => {
    console.log(`listening to port *:${port}. press ctrl + c to cancel.`)
})