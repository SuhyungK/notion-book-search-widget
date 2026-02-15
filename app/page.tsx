"use client";

import { useState } from "react";
import type { Book } from "@/types/book";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTarget, setSearchTarget] = useState("");

  // 도서 조회 API (GET)
  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/search?q=${query}&target=${searchTarget}`
      ); 
      const data = await res.json();
      setBooks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 노션 DB 추가 API (POST)
  const addToNotion = async (book: Book) => {
    await fetch("/api/notion/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2025-09-03"
      },
      body: JSON.stringify(book),
    });

    alert("노션에 추가됨!");
  };


  return (
    <div 
      // className="flex items-center gap-2 mb-5 w-full border border-1"
      style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchBooks();
        }}
        className="flex items-center gap-2 mb-5 w-full"
      >
        {/* 1 : select */}
        <select
          value={searchTarget}
          onChange={(e) =>
            setSearchTarget(e.target.value as "Book" | "Foreign")
          }
          className="flex-[1] h-12 px-3 border border-gray-300 rounded-md"
        >
          <option value="Book">국내도서</option>
          <option value="Foreign">외국도서</option>
        </select>

        {/* 3 : input */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목 검색"
          className="flex-[3] h-12 px-4 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 1 : button */}
        <button
          type="submit"
          className="flex-[1] h-12 border border-blue-500 bg-blue-500 
                    text-white rounded-md hover:bg-blue-600 transition"
        >
          검색
        </button>
      </form>

      {/* 로딩 */}
      {loading && <Spinner />}

      {/* 결과 리스트 */}
      {!loading && 
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book, idx) => (
            <li
              key={idx}
              onClick={() => addToNotion(book)}
              style={{
                display: "flex",
                gap: 12,
                padding: 12,
                borderBottom: "1px solid #ddd",
              }}
              className="cursor-pointer"
            >
              {/* 표지 */}
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: 80, height: "auto" }}
              />

              {/* 정보 */}
              <div>
                <h3 style={{ margin: "0 0 4px 0" }}>{book.title}</h3>
                {book.subtitle && (
                  <p style={{ margin: "0 0 4px 0", color: "#666" }}>
                    {book.subtitle}
                  </p>
                )}
                <p style={{ margin: 0 }}>
                  ✍️ {book.authors || "저자 없음"}
                </p>
                <p style={{ margin: 0 }}>
                  🏢 {book.publisher || "출판사 없음"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      }
      
    </div>
  );
}
