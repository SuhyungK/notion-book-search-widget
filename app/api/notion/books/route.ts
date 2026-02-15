import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import type { Book } from "@/types/book";
import { getToday } from "@/utils/date";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function POST(req: Request) {
  const book: Book = await req.json();

  const page = await notion.pages.create({
    parent: {
      data_source_id: process.env.NOTION_DATABASE_ID!,
    },
    properties: {
      Name: {
        title: [
          {
            text: { content: book.title },
          },
        ],
      },
      "출판일": {
        date: {
          start: book.pubDate,
        },
      },
      "저자": {
        // multi_select: book.authors.map((name) => ({
        //   name,
        // })),
        rich_text: [
          {
            text: { content: book.authors },
          },
        ],
      },
      "출판사": {
        rich_text: [
          {
            text: { content: book.publisher },
          },
        ],
      },
      태그: {
        multi_select: [
          { name: book.category },
        ],
      },
      줄거리: {
        rich_text: [
          {
            text: { content: book.description },
          },
        ],
      },
      완독일 : {
        date: {
          start: getToday(),
        },
      }
      // "표지": {
      //   url: book.thumbnail,
      // },
    }
  });

  // 2. 페이지 안에 이미지 block 추가
  await notion.blocks.children.append({
    block_id: page.id,
    children: [
      {
        object: "block",
        type: "image",
        image: {
          type: "external",
          external: {
            url: book.cover,
          },
        },
      },
    ],
  });

  return NextResponse.json({ success: true });
}
