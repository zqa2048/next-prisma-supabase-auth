import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "无权限", data: session });
  }

  if (req.method === "GET") {
    try {
      const { favoriteHomes } = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          favoriteHomes: true,
        },
      });
      console.log("object :>> ", favoriteHomes);
      res.status(200).json(favoriteHomes);
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({ message: "发生了一些错误" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `请求方法 ${req.method} 不支持.` });
  }
}
