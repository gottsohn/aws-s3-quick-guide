AMAZON S3 QUICK GUIDE
---------------------

### Registration
Visit http://aws.amazon.com/s3/ to sign up. Enter valid credit card details as it's required for your account to be enabled.


Select the *S3* service under the list of Services.

Firstly you will want to create a bucket, which will be a sub-domain in the region's domain address your *S3* service will run on.


### Usage
You might want to make your bucket public, making all the files/documents uploaded to it, visible to the public, else it'll return a 403 Unauthorized Access if opened in your browser without the pertinent authentication.
To make your bucket public follow these steps:
Assuming our bucket name is `my-bucket`, go to the bucket properties (right clicking and selecting properties)
Under the Permissions Panel, click on the Add Policy or Edit Policy and paste the below Policy JSON Object
```js
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

This will make the files `my-bucket` public.
NOTE: Directory browsing is not allowed, only files can be viewed.

For authorized usage you will be need to create a user _(recommended)_ with the pertinent permission's policy or create a root key _(not recommened)_.
Both can be created from the _Security Credentials_ page, the link can be found from the drop down menu under your full name in the page header.

#####Root Keys
To create root keys expand the _Access Keys (Access Key ID and Secret Access Key)_ pane and add a new key. After creating a key, you are prompted to download a `.csv` file containing the KEY and SECRET as the SECRET cannot be previewed ever again on the pane. It can only be removed or disabled.

From the above you will be able to get a _AWS_ACCESS_KEY_ID_ and _AWS_SECRET_ACCESS_KEY_ with root access, and can be used for all operations with the API.

##### User Keys
Still from the _Security Credentials_ page, select the Users menu on the left and create a new User. The _user_ has the same key format as the _Root Key_ above, only that the policy or Group attached to a _user_ is responsible for the _permission_ that user account possess. Multiple policies can be added to a single _user_, as the case may be.



### API
#### _nodejs_

You will need the aws-sdk package available on npm via `npm install aws-sdk`.

`var AWS = require('aws-sdk');`

Before using the API, you will need to set the key and secret in as environment variables as below for debugging:

```js
process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
```

This should be hardcoded for debugging purposes only, not in production. 
*_Exposing your configuration to git or any version control system can pose a Security Risk to your application._*

The environment variable are required to make any authorized call to *S3* using aws-sdk
You should set your region as well like so:

`AWS.config.region = 'us-west-2';`

#### Getting a File/Object
To get files from your storage (assuming you didn't make your bucket public). Create a new instance of the *S3* class and call the getObject function as shown below.

```js
var s3 = new AWS.S3();
s3.getObject({
    Bucket: 'my-bucket',
    Key: 'path/to/file.txt'
  }, function(err, data) {
      if(err) {
        // handle error
      }
      else {
        // data will be and object, the file in question will be a buffer in data.Body, coverted easily to a string by calling .toString() on it.
      }
});
```

#### Uploading a File/Object

It's advisable to attempt to create a bucket first before uploading a file, if the bucket exists, the process continues as it should.
The `Body` and `Key` values should be passed into the upload function as it's first argument, an object, as below.


```js
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
    }
    else {
      // data will return
      // { Etag: 'Etag of uploaded file',
      //   Location: 'Full URI path to the uploaded file' }
    }
  });
});
```

### Deleting a File/Object

Deleting a file is pretty easy, as seen below

```js
var s3 = new AWS.S3();
s3.deleteObject({
    Bucket: 'my-bucket',
    Key: 'path/to/file.txt'
  }, function(err, data) {
      if(err) {
        // handle error
      }
      else {
        // data
      }
});
```
