"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub() {
    try {
        const { account } = await createAdminClient();

        const headersList = await headers();
        const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // createOAuth2Token is correct for node-appwrite (server-side)
        const redirectUrl = await account.createOAuth2Token(
            OAuthProvider.Github,
            `${origin}/oauth`, // Success callback
            `${origin}/sign-up`, // Failure callback
        );

        return redirect(redirectUrl);
    } catch (error) {
        console.error("GitHub OAuth initiation error:", error);
        throw error;
    }
}

export async function signUpWithGoogle() {
    try {
        const { account } = await createAdminClient();

        const headersList = await headers();
        const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // createOAuth2Token is correct for node-appwrite (server-side)
        const redirectUrl = await account.createOAuth2Token(
            OAuthProvider.Google,
            `${origin}/oauth`, // Success callback
            `${origin}/sign-up`, // Failure callback
        );

        return redirect(redirectUrl);
    } catch (error) {
        console.error("Google OAuth initiation error:", error);
        throw error;
    }
}