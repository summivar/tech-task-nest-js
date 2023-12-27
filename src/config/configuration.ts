export default () => ({
  port: parseInt(process.env.PORT, 10) || 7777,
  swaggerTheme: process.env.SWAGGER_THEME,
  database: {
    URL: process.env.DATABASE_URL,
  },
  mailer: {
    smtpHost: process.env.SMTP_HOST,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  }
});
