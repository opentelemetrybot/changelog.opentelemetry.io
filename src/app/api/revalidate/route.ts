import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization");

  // Verify the request is legitimate
  if (token !== `Bearer ${process.env.REVALIDATION_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Revalidate the home page and feed
    revalidatePath("/", "page");
    revalidatePath("/feed", "page");

    return new Response("Revalidated", { status: 200 });
  } catch (error) {
    return new Response("Error revalidating", { status: 500 });
  }
}
