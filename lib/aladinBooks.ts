// lib/googleBooks.ts
import { ApiParams, Book, BookResponse } from "../types/book"

const getCategoryType = (category: string) => {
  // 국내도서 > 소설/시/희곡 > 소설 일반 > ... 
  return category.split(">")[1] ?? "";
}

export async function getBooks(params: ApiParams): Promise<Book[]> {
  const query = new URLSearchParams({
    ttbkey: process.env.ALADIN_API_TTB_KEY ?? "",
    Query: params.query,
    QueryType: params.queryType,
    MaxResults: String(params.maxResults),
    start: String(params.start),
    SearchTarget: params.searchTarget,
    output: "js",
    Version: "20131101",
    Cover: params.cover,
  });

  const res = await fetch(
    `${process.env.ALADIN_API_URL}?${query}`
  );

  if (!res.ok) {
    throw new Error("Aladin API failed");
  }
  
  const data = await res.json();

  if (!data.item) return [];
  
  return data.item.map((item: BookResponse) => {
    return {
      title: item.title ?? "",
      link: item.link ?? "",
      authors: item.author ?? "",
      pubDate: item.pubDate ?? "",
      description: item.description ?? "",
      isbn: item.isbn13 ?? "",
      publisher: item.publisher ?? "",
      cover: item.cover ?? "",
      category: getCategoryType(item.categoryName) ?? ""
    };
  });
}
