export interface Book {
  title: string;        // 제목
  subtitle: string;   
  authors: string;      // 저자
  publisher: string;    // 출판사
  cover: string;        // 표지
  description: string;  // 줄거리
  pubDate: string;
  category: string;
}

export interface ApiParams {
  query: string;
  queryType: string;
  maxResults: number;
  start: number;
  searchTarget: string;
  cover: string;
}

export interface BookResponse {
  title: string;          // 제목
  link: string;           // 링크
  author: string;         // 작가
  pubDate: string;        // 출판일
  description: string;    // 줄거리
  isbn13: string;         // ISBN
  cover: string;          // 표지
  publisher: string       // 출판사
  categoryName: string;       // category
}