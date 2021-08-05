const blake3 = require("blake3");

/**
 * 
 * @param {string} sessionId Id of the session
 * @param {string} apiId The api Id
 * @param {string} apiKey The api key
 * @returns 
 */
const makeToken = (sessionId, apiId, apiKey) => {
  const cheksum = blake3.hash(sessionId + "." + apiKey).toString("base64");
  const token = sessionId + "." + apiId + "." + cheksum;

  return token;
};

export default makeToken;