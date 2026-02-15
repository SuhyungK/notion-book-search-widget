// lib/googleBooks.ts
import { Book } from "../types/book"

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(query: string): Promise<Book[]> {
  const res = await fetch(
    `${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Google Books API failed");
  }

  const data = await res.json();

  if (!data.items) return [];

  debugger;
  
  return data.items.map((item: any) => {
    const info = item.volumeInfo;
    
    return {
      title: info.title ?? "제목 없음",
      authors: info.authors ?? [],
      publisher: info.publisher ?? "",
      thumbnail: info.imageLinks?.thumbnail ?? "",
      isbn:
        info.industryIdentifiers?.find(
          (id: any) => id.type === "ISBN_13"
        )?.identifier ?? "",
    };
  });
}
