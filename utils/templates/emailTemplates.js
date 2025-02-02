const verificationEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .email-container {
            background-color: #ffffff;
            width: 90%;
            max-width: 600px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #28a745;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 1.5em;
            font-weight: bold;
        }

        .content {
            padding: 20px;
            color: #333333;
            text-align: center;
        }

        .content p {
            margin: 10px 0;
        }

        .verification-code {
            font-size: 2em;
            font-weight: bold;
            color: #28a745;
            margin: 20px 0;
        }

        .footer {
            padding: 20px;
            color: #777777;
            font-size: 0.9em;
            text-align: center;
            border-top: 1px solid #ddd;
        }

        .footer a {
            color: #28a745;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Verify Your Email
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>Thank you for signing up! Your verification code is:</p>
            <div class="verification-code">{verificationCode}</div>
            <p>Enter this code on the verification page to complete your registration.</p>
            <p>This code will expire in 15 minutes for security reasons.</p>
            <p>If you didn’t create an account with us, please ignore this email.</p>
        </div>
        <div class="footer">
            Best regards,<br>
            <strong>Your App Team</strong>
        </div>
    </div>
</body>
</html>

`

const welcomeEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: #ffffff;
            width: 400px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            text-align: center;
            padding: 20px;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        .logo span {
            color: #00AEEF;
            text-decoration: underline;
        }

        .image {
            margin: 20px 0;
        }

        .image img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }

        .content {
            margin-bottom: 20px;
        }

        .content h1 {
            font-size: 20px;
            color: #333;
            margin: 0;
        }

        .content p {
            font-size: 14px;
            color: #555;
            margin: 10px 0;
        }

        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: bold;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">Auth Company <span>✔</span></div>
        <div class="image">
            <img 
             src="https://plus.unsplash.com/premium_photo-1679731353672-a94831f2b4f3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="Welcome Image"
            >
        </div>
        <div class="content">
            <h1>Welcome, {name}</h1>
            <p>Thanks for choosing Auth Company! We are happy to see you on board.</p>
            <p>You can see your dashboard here 👇</p>
        </div>
        <a href="#" class="button">My Dashboard</a>
    </div>
</body>
</html>
`

const resetPasswordEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.email-container {
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.header {
  background-color: #4CAF50;
  color: #fff;
  text-align: center;
  padding: 20px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: white
}

.content {
  padding: 20px;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}

.button-container {
  text-align: center;
  margin: 30px 0;
}

.reset-button {
  background-color: #4CAF50;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.reset-button:hover {
  background-color: #45a049;
}

.expiration-note {
  font-size: 14px;
  color: #888;
  text-align: center;
  margin: 10px 0;
}
</style>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div class="button-container">
        <a href="{resetURL}" class="reset-button">Reset Password</a>
      </div>
      <p class="expiration-note">This link will expire in 1 hour for security reasons.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
  </div>
</body>
</html>
`
const newPasswordEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.email-container {
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.header {
  background-color: #4CAF50;
  color: #fff;
  text-align: center;
  padding: 20px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.content {
  padding: 20px;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}

.success-icon {
  text-align: center;
  font-size: 40px;
  color: #4CAF50;
  margin: 20px 0;
}

.recommendation p {
  font-weight: bold;
}

.recommendation ul {
  margin-top: 10px;
  padding-left: 20px;
  color: #555;
}

.recommendation li {
  margin: 8px 0;
}

</style>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Password Update Successfully</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We're writing to confirm that your password has been successfully reset.</p>
      <div class="success-icon">✔</div>
      <p>If you did not initiate this password reset, please contact our support team immediately.</p>
      <div class="recommendation">
        <p>For security reasons, we recommend that you:</p>
        <ul>
          <li>Use a strong, unique password</li>
          <li>Enable two-factor authentication if available</li>
          <li>Avoid using the same password across multiple sites</li>
        </ul>
      </div>
      <p>Thank you for helping us keep your account secure.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
  </div>
</body>
</html>
`

module.exports = {
    verificationEmailTemplate,
    welcomeEmailTemplate,
    resetPasswordEmailTemplate,
    newPasswordEmailTemplate
}