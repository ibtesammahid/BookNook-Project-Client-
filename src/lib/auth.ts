import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("booknook");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
   plugins: [
        jwt(), 
    ],
    session:{
        cookieCache:{
            enable: true,
            strategy: 'jwt',
            maxAge: 3 * 24 * 60 * 60, // 3 days
        }
    },

  database: mongodbAdapter(db, {
    client,
  }),
});