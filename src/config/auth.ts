export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: 12 * 60 * 60, // 12hours
    refreshExpiresIn: 30 * 24 * 60 * 60, // 30days
  },
};
