export class SendData {
  to: string;

  subject: string;

  template: string;

  context: {
    [key: string]: any;
  };

  attachments?: Express.Multer.File[];
}