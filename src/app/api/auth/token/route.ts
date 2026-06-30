
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return Response.json({ error: "No code" }, { status: 400 });

  // Exchange code for tokens manually
  const tokenRes = await fetch(
    "https://oauth2-mock-api.istad.co/realms/ecommerce/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: "ecommerce-api",
        redirect_uri: "http://localhost:3000",
        code_verifier: "WuNQfvX8z0S0-uUt0Dq8ZDBe9jYd42P4vAqY_oyUY72Xbw0EkmbBZR-WXehTPYoKX_BF642kIvWfY15ux610IVZ6dLE23_LLuNDtcQJzB9I2Cr4uTDrkRbaNZflPs8AK",
        code,
      }),
    }
  );

  const tokens = await tokenRes.json();
  console.log(tokens?.access_token);

  return Response.json(tokens);
}