import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
export class TodosStorage {
    constructor(
        private readonly todosStorage = process.env.ATTACHMENT_S3_BUCKET,
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4'})
    ) {}
   async getBucketName() {
        return this.todosStorage;
    }
   async getPresignedUploadURL(bucketName, todoId, urlExpiration) {
        return this.s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: todoId,
            Expires: parseInt(urlExpiration)
        });
    }
}