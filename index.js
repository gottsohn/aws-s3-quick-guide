var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
// Set your KEY and SECRET
process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";

var uploadFile = function() {
  var s3bucket = new AWS.S3({
    params: {
      Bucket: 'my-bucket'
    }
  });

  s3bucket.createBucket(function() {
    var params = {
      Key: 'path/to/new-file.txt',
      Body: 'Text Content of file to be uploaded'
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        // handle error
        throw err;
      }
       else {
        console.log(data);
      }
    });
  });
};

var getFile = function() {
  var s3 = new AWS.S3();
  s3.getObject({
    Bucket: 'my-bucket',
    Key: 'path/to/file.txt'
  }, function(err, data) {
    if (err) {
      // handle error
      throw err;
    }
     else {
      console.log(data);
    }
  });
};

var deleteFile = function() {
  var s3 = new AWS.S3();
  s3.deleteObject({
    Bucket: 'my-bucket',
    Key: 'path/to/file.txt'
  }, function(err, data) {
    if (err) {
      throw err;
    }
     else {
      console.log(data);
    }
  });
};
