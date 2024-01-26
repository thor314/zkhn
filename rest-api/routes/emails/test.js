// run me you quail
// run me, I fail
// run me with npm
// run test, mlem

const nock = require('nock');
const { sendResetPasswordEmail } = require('./api'); // adjust the path as needed

describe('sendResetPasswordEmail', () => {
  it('should send an email and return success', async () => {
    // Mock the SMTP server
    nock('http://localhost:3000')
      .post('/reset')
      .reply(200, { message: 'Email sent' });

    const response = await sendResetPasswordEmail('testuser', 'testtoken', 'test@example.com');

    expect(response).toEqual({ success: true });
  });

  it('should throw an error if the email cannot be sent', async () => {
    // Mock the SMTP server with an error
    nock('http://localhost:3000')
      .post('/reset')
      .replyWithError('Failed to send email');

    await expect(sendResetPasswordEmail('testuser', 'testtoken', 'test@example.com')).rejects.toEqual({ success: false });
  });
});