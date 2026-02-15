// app/api/search/route.ts
import { getBooks } from "@/lib/aladinBooks";
import { ApiParams } from "@/types/book";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");
  const target = searchParams.get("target") || "All";

  if (!query) {
    return Response.json([], { status: 400 });
  }

  const params: ApiParams = {
    query,
    queryType: "Title",
    maxResults: 10,
    start: 1,
    searchTarget: target as "Book" | "Foreign" | "All",
    cover: "Big"
  };

  const books = await getBooks(params);

  return Response.json(books);
}
