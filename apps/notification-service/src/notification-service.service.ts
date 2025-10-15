import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EmailDto } from './dtos/email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { WelcomeEmailDto } from './dtos/welcomeEmail.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ShareDocDto } from './dtos/shareDoc.dto';
import { NotificationDataDto } from './dtos/notificationData.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationServiceService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private from: string | undefined;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private configService: ConfigService,
    @Inject('auth-service')
    private readonly authClient: ClientProxy,
  ) {}

  onModuleInit() {
    const host = this.configService.get<string>('EMAIL_HOST');
    const port = this.configService.get<number>('EMAIL_PORT');
    const secure = this.configService.get<boolean>('EMAIL_SECURE');
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');
    this.from = this.configService.get<string>('EMAIL_FROM');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendResetPasswordEmail(emailDto: EmailDto) {
    const result = await this.authClient
      .send({ cmd: 'find-user-by-email' }, emailDto.email)
      .toPromise();
    if (!result.success) {
      return result;
    }
    const link =
      this.configService.get<string>('LINK') + `/${result.data.userId}`;
    const html = this.resetPasswordTemplate(link);
    return this.sendMail(emailDto.email, 'Reset Password', undefined, html);
  }

  async sendShareDocumentEmail(shareDocDto: ShareDocDto) {
    const { documentId, emailList } = shareDocDto;
    const link =
      this.configService.get<string>('DOCUMENT_LINK') + `/${documentId}`;
    await Promise.all(
      emailList.emails.map(async (email) => {
        const html = this.shareDocumentTemplate(
          'Untitled Document',
          link,
          'Harsha',
        );
        return this.sendMail(email, 'Document Shared', undefined, html);
      }),
    );

    return {
      success: true,
      message: 'Share Document Emails Sent Successfully',
    };
  }

  async sendWelcomeEmail(welcomeDto: WelcomeEmailDto) {
    const html = this.welcomeEmailTemplate(welcomeDto.fullName);
    return this.sendMail(
      welcomeDto.email,
      'Welcome to EduCollab',
      undefined,
      html,
    );
  }
 
  

  resetPasswordTemplate = (link: string | undefined) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Password Reset - EduCollab</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden; margin:40px auto; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
          
          <!-- Header Section -->
          <tr>
            <td bgcolor="#083c70" style="padding:30px; text-align:left;">
              <h2 style="margin:0; font-size:20px; font-weight:bold; color:#ffffff;">
                Password Reset Request - EduCollab
              </h2>
            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">Hi!</p>
              <p style="margin:0 0 20px 0;">
                We received a request to reset your password for your EduCollab account. 
                Click the button below to reset it:
              </p>

              <!-- CTA Button -->
              <p style="text-align:center; margin:30px 0;">
                <a href="${link}" 
                   style="display:inline-block; padding:14px 28px; background-color:#083c70; color:#ffffff; text-decoration:none; border-radius:4px; font-weight:bold; font-size:15px;">
                  Reset Password
                </a>
              </p>

              <p style="margin:0 0 10px 0;">
                If you did not request a password reset, please ignore this email. 
                This link will expire in 1 hour for your security.
              </p>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td bgcolor="#fafafa" style="padding:20px; text-align:center; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} EduCollab. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  welcomeEmailTemplate = (fullName: string | undefined) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Welcome - EduCollab</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden; margin:40px auto; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
          <!-- Header Section -->
          <tr>
            <td bgcolor="#083c70" style="padding:30px; text-align:left;">
              <h2 style="margin:0; font-size:20px; font-weight:bold; color:#ffffff;">
                Welcome to EduCollab, ${fullName}!
              </h2>
            </td>
          </tr>
          <!-- Body Section -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">Hi ${fullName}!</p>
              <p style="margin:0 0 20px 0;">
                Thank you for joining EduCollab. We're excited to have you on board!
              </p>
              <p style="margin:0 0 20px 0;">
                To get started, please visit our platform and explore the available resources.
              </p>
            </td>
          </tr>
          <!-- Footer Section -->
          <tr>
            <td bgcolor="#fafafa" style="padding:20px; text-align:center; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} EduCollab. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  shareDocumentTemplate = (
    docTitle: 'Untitled Document' | undefined,
    link: string | undefined,
    senderName: 'Harsha' | undefined,
  ) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Document Shared - EduCollab</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden; margin:40px auto; box-shadow:0 2px 5px rgba(0,0,0,0.1);">

          <!-- Header Section -->
          <tr>
            <td bgcolor="#083c70" style="padding:30px; text-align:left;">
              <h2 style="margin:0; font-size:20px; font-weight:bold; color:#ffffff;">
                Document Shared With You
              </h2>
            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">Hi!</p>
              <p style="margin:0 0 20px 0;">
                <strong>${senderName}</strong> has shared a document with you on EduCollab: 
                <em>${docTitle}</em>.
              </p>

              <!-- CTA Button -->
              <p style="text-align:center; margin:30px 0;">
                <a href="${link}" 
                   style="display:inline-block; padding:14px 28px; background-color:#083c70; color:#ffffff; text-decoration:none; border-radius:4px; font-weight:bold; font-size:15px;">
                  Open Document
                </a>
              </p>

              <p style="margin:0 0 10px 0;">
                If you cannot click the button, copy and paste the following URL into your browser:
                <br />
                <a href="${link}" style="color:#083c70;">${link}</a>
              </p>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td bgcolor="#fafafa" style="padding:20px; text-align:center; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} EduCollab. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  async sendMail(to: string, subject: string, text?: string, html?: string) {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        text,
        html,
      });
      return { success: true, message: 'Email Sent Successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async sendNotifications(notificationDataDto: NotificationDataDto) {
    try {
      const { users, notification, timestamp, isRead, link } =
        notificationDataDto;
      await Promise.all(
        users.map(async (userId) => {
          const newNotification = this.notificationRepository.create({
            userId: userId,
            notification: notification,
            timestamp: new Date(timestamp),
            isRead: isRead,
            link: link,
          });

          await this.notificationRepository.save(newNotification);
        }),
      );

      return {
        success: true,
        message: 'Notifications sent successfully',
      };
    } catch (error) {
      console.error('Error sending notifications:', error);
      return {
        success: false,
        message: 'Failed to send notifications',
        error: error.message,
      };
    }
  }

  async getNotifications(userId: string) {
    try {
      const notifications = await this.notificationRepository.find({
        where: { userId },
        order: { timestamp: 'DESC' },
      });
      if (notifications.length === 0) {
        return {
          success: true,
          message: 'No notifications found',
        };
      }
      return {
        success: true,
        data: notifications,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error retrieving notifications',
      };
    }
  }

  async markAsRead(notificationId: string) {
    try {
      const notification = await this.notificationRepository.findOne({
        where: { notificationId: notificationId },
      });
      if (!notification) {
        return {
          success: false,
          message: 'Notification not found',
        };
      }

      await this.notificationRepository.update(notificationId, {
        isRead: true,
      });

      return {
        success: true,
        message: 'Notification marked as read',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error marking notification as read',
      };
    }
  }
}
