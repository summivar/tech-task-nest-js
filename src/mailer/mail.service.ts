import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendData } from './types';
import { ApplicationData } from './types/application.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {
  }

  private async sendMail(data: SendData) {
    console.log(`Sending email to ${data.to}, context: ${JSON.stringify(data.context)}, template ${data.template}`);
    try {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        template: `./${data.template}`,
        context: data.context,
        attachments: data?.attachments?.map(({originalname, buffer, encoding}) => ({
          filename: originalname,
          content: buffer,
          encoding,
        }))
      });

      return true;
    } catch (e) {
      console.log(`Error during email sending to ${data.to}, error: ${e}`);
      throw `Error during email sending to ${data.to}, error: ${e}`;
    }
  }

  async sendApplicationMail(data: ApplicationData) {
    return this.sendMail({
      to: 'viachlyk@gmail.com', // company's email
      subject: 'Application',
      template: 'application',
      context: {
        name: data.name,
        phone: data.phone,
        text: data?.text ?? "No text provided",
      },
      attachments: data?.files
    });
  }
}
