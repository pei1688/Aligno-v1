import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); //會解析出一個 URL 物件。
  const query = searchParams.get("q") || ""; //並在URL後面增加search?q=查詢結果

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  // 查詢看板 (根據你的資料庫結構修改)
  const boards = await db.board.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    select: { id: true, title: true },
  });

  // 查詢卡片 (根據你的資料庫結構修改)
  const cards = await db.card.findMany({
    where: {
      title: { contains: query, mode: "insensitive" }, //contains 是一個查詢條件，用來檢查 title 欄位中是否包含 query 變數中的值 ，mode: "insensitive" 指的是查詢過程中不區分大小寫。
    },
    select: { id: true, title: true, description: true },
  });

  // 標記結果類型方便辨識
  const boardResults = boards.map((board) => ({ ...board, type: "board" }));
  const cardResults = cards.map((card) => ({ ...card, type: "card" }));

  return NextResponse.json([...boardResults, ...cardResults]);
}
