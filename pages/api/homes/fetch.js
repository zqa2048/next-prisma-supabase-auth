import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        body: { page },
      } = req;
      const homes = await prisma.home.findMany({
        skip: page * 4,
        take: 4,
      });
      res.status(200).json(homes);
    } catch (error) {
      res.status(500).json({ message: "发生了一些错误" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `请求方法 ${req.method} 不支持.` });
  }
}
