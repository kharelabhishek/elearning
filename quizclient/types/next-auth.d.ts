import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user: {
            accessToken:string;
            refreshToken:string;
            user: {
                _id: string
                email: string
                password: string
                username: string
                name: string
                type: string
                language: string
                isPremium: boolean
                countryCode: string
                photoUrl: string
                isActivated: boolean
                isVerified: boolean
                platform: string
                createdAt: string
                updatedAt: string
                __v: number
            }
        }
    }
}