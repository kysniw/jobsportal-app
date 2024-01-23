import { cookies } from "next/headers";

export async function checkAuthentication() {
  if (cookies().has("Token")) {
    const token = cookies().get("Token");
    try {
      const res = await fetch(`${process.env.APP_KEY}/token/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token?.value,
        }),
      });

      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return false;
}
