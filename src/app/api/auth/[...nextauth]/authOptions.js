import { axiosPublicInstance } from "@/config/axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // query for checking user exists or not in database
        try {
          const {
            data: {
              data: { access_token },
            },
          } = await axiosPublicInstance.post(`/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          return {
            user: {},
            jwt: access_token,
          };
        } catch (error) {
          throw new Error(JSON.stringify(error?.response?.data, 2));
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(githubProfile) {
        return {
          id: githubProfile?.id?.toString(),
          name: githubProfile.name,
          email: githubProfile.email,
          image: githubProfile.avatar_url,
        };
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  //   secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const isGithubUser = account.provider === "github";

        if (isGithubUser) {
          const { data } = await axiosPublicInstance.get(
            `/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );

          token.userId = +user.id;
          token.jwt = data.jwt;
          token.user = data.user;
        } else {
          token.userId = user.user.id;
          token.jwt = user.jwt;
          token.user = user.user;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      // modify for front-end
      session.userId = token.userId;
      session.jwt = token.jwt;
      session.user = token.user;

      return session;
    },
  },
};
