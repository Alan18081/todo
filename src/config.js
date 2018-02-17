const apiKey = 'AIzaSyDi5gHhdw-M3tKlr-Wrft_Qric3wh96OYk';

export default {
  auth: `/signupNewUser?key=${apiKey}`,
  login: `/verifyPassword?key=${apiKey}`,
  changeRegInfo: `/setAccountInfo?key=${apiKey}`,
  getUserInfo: `/getAccountInfo?key=${apiKey}`,
  refreshToken: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
  deleteAccount: `/deleteAccount?key=${apiKey}`,
  verifyEmail: `/getOobConfirmationCode?key=${apiKey}`
}