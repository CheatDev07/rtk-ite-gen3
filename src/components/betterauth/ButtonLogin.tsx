
"use client"
import { authClient } from "@/lib/auth-client";

export default function ButtonLogin() {

  const handleSignInWithGoogle = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
      });
      console.log(data);
    }

  const handleSignOutWithGoogle = async () => {
      await authClient.signOut();

    }
  return (
    <div>

      <button onClick={handleSignInWithGoogle} className="border p-4">Sign In With Google</button>

      <button onClick={handleSignOutWithGoogle} className="border p-4">SignOut With Google</button>
      
    </div>
  )
}
