import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

export default function LogInWithGoogle() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const res = await fetch(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
            );
            console.log(await res.json());
            // handle data
        },
    });

    return (
        <div>
            LogInWithGoogle
            <button onClick={() => login()}>Login with google</button>
        </div>
    );
}