import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoAdapter";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  providers: [
    CredentialsProvider({
      name: "Institute Login",
      async authorize(credentials, req) {
        await dbConnect();
        const findInstitute = await Institute.findOne({
          email: credentials.email,
        });

        if (!findInstitute) {
          throw new Error("Couldn't find Institute");
        }
        const res = await bcrypt.compare(
          credentials.password,
          findInstitute.password
        );
        // console.log(res);
        if (res) {
          return findInstitute;
        } else {
          throw new Error("Password mismatch");
        }
      },
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "shubham@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};
export default NextAuth(authOptions);
