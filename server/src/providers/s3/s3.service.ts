import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_S3_REGION,
  AWS_SECRET_ACCESS_KEY,
} from 'src/config';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private readonly logger: Logger) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  public async uploadFileToS3(
    fileName: string,
    buffer: Buffer,
  ): Promise<S3.ManagedUpload.SendData> {
    const res = await this.s3
      .upload({
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Body: buffer,
      })
      .promise();

    this.logger.debug(
      `File uploaded to s3 [fileName: ${fileName}]`,
      S3Service.name,
    );

    return res;
  }

  public generateFileUrl(filePath: string): string {
    return `https://${AWS_S3_BUCKET}.s3-${AWS_S3_REGION}.amazonaws.com/${filePath}`;
  }
}
