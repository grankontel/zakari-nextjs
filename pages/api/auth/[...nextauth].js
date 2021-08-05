import NextAuth from "next-auth";
import Providers from "next-auth/providers";

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

  user.zakariToken = process.env.ZAKARI_TOKEN;
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
