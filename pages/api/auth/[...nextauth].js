import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import makeToken from "../../../lib/makeToken";
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10)

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

const callbacks = {};

callbacks.session = async function (session, token) {
  // Add property to session, like an access_token from a provider.
  if (token) {
    session.user.login = token.login;
    session.user.zakariToken = token.zakariToken;
  }

  return session;
};

callbacks.jwt = async function (token, user, account, profile, isNewUser) {
  // Add access_token to the token right after signin
  if (user) {
    token.login = user.login;
    token.zakariToken = user.zakariToken;
  }

  return token;
};

callbacks.signIn = async function signIn(user, account, metadata) {
  if (account.provider === "github") {
    const emailRes = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${account.accessToken}`,
      },
    });
    const emails = await emailRes.json();
    const primaryEmail = emails.find((e) => e.primary).email;

    user.login = metadata.login;
    user.email = primaryEmail;
  }

  const sessionId= nanoid() // should be stored somehow
  const newToken= makeToken(sessionId, process.env.ZAKARI_API_ID, process.env.ZAKARI_API_KEY)
  user.zakariToken = newToken;

  return true;
};

const options = {
  providers,
  secret: process.env.HASH_SECRET,
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 5 * 24 * 60 * 60, // 5 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    /*
    signingKey: {
      kty: process.env.JWT_KTY,
      kid: process.env.JWT_KID,
      alg: process.env.JWT_ALG,
      k: process.env.JWT_K,
    },
    verificationOptions: {
        algorithms: [process.env.JWT_ALG]
     },  
     */  
  },
  callbacks,
};

const resolver = (req, res) => NextAuth(req, res, options);

export default resolver;
