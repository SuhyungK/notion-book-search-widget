## 노션 자동 책 추가 위젯

<img width="755" height="420" alt="Screenshot 2026-02-15 at 6 54 28 PM" src="https://github.com/user-attachments/assets/efdda166-d255-45fb-9098-31cb71f1b346" />

알라딘 Open API를 이용해 도서를 검색하고, 선택한 도서를 Notion 데이터베이스에 저장하는 웹 애플리케이션입니다. 노션에 위젯으로 임베드하여 사용할 수 있습니다. 

## Description

### ✨ Main Features
- 🔎 알라딘 API를 통한 도서 검색
- 💾 노션 DB에 도서 상세 정보 저장

### 🚀 Tech Stack
- Framework: Next.js (App Router)  
- Styling: Tailwind CSS  
- API: 알라딘 Open API 
- Database: Notion API  
- Language: TypeScript  
 

### 📁 Project Structure
```
app/
 ├─ api/
 │   ├─ notion/books/route.ts
 │   ├─ search/route.ts
 │   ├─ globals.css
 │   ├─ layout.tsx
 │   └─ page.tsx
components/
 ├─ Spinner.tsx
lib/
 ├─ aladinBooks.ts
types/
 ├─ book.ts
utils
 └─ date.ts
```

### Environment Variables
```
// .env.local

NOTION_API_KEY=YOUR_NOTION_KEY

NOTION_DATABASE_ID=YOUR_DATABASE_ID

ALADIN_API_URL=http://www.aladin.co.kr/ttb/api/ItemSearch.aspx

ALADIN_API_TTB_KEY=YOUR_TTB_KEY

```
| ⚠️ .env.local 파일은 절대 Git에 업로드하지 마세요.

<br />


## Installation


```bash
npm install
npm run dev
```
