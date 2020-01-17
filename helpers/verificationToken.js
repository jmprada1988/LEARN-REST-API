const crypto = require('crypto');

const getVerificationToken = ({stringBase = 'base64', byteLength = 48} = {}) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      }
      resolve(buffer.toString(stringBase));
    })
  })
}

module.exports = { getVerificationToken };