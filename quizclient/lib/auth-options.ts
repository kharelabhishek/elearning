import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { login } from "@/services/auth/api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        const payload = {
          email: credentials?.email ?? "",
          password: credentials?.password ?? "",
        };
        const user = await login(payload);

        // const user = { id: "1", name: "John", email: credentials?.email };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user.data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // console.log(user, 'user')
      // console.log(user.user.email, 'user.email')
      if (user && "user" in user) {
        // const userWithProperties = user as {
        //   user: {
        //     email: string;
        //     username: string;
        //     type: string;
        //     accessToken: string;
        //     refreshToken: string;
        //     photoUrl: string;
        //     name: string;
        //   };
        // };
        // console.log(user.user.email, 'user.email');
        // Access other properties like user.userName, user.userType, user.token, etc.
        // token.email = userWithProperties.user.email;
        // token.username = userWithProperties.user.username;
        // token.userType = userWithProperties.user.type;
        // token.accessToken = userWithProperties.user.accessToken;
        // token.refreshToken = userWithProperties.user.refreshToken;
        // token.picture = userWithProperties.user.photoUrl;
        // token.name = userWithProperties.user.name;

      }
      return {...token, ...user};
      // console.log(token, "token");

    },

      async session({ session, token, user }) {
        // console.log('session', session)
        // console.log('user', user)
        // Send properties to the client, like an access_token and user id from a provider.
        session.user = token as any;
        return session
      }
  },
  pages: {
    signIn: "/signin", //sigin page
  },
};
