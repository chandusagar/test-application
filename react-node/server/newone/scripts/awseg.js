const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAS6YU7IZMIUNJLW7X",
  secretAccessKey: "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",
  logger: process.stdout,
  maxRetries: 5,
});

// var s3 = new AWS.S3();

// s3.listBuckets(function(err, data){
//     if(err){
//         console.log(err, err.stack)
//     }
//     else{
//         console.log(data)
//     }
// })
var params = {
    limit: 10,
    // logGroupNamePrefix: 'STRING_VALUE',
    // nextToken: 'STRING_VALUE'
  };
const CWLogs = new AWS.CloudWatchLogs();
let str = {}
CWLogs.describeLogGroups(params ,function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
