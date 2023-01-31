import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "未登录" });
  }
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const user = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteHomes: {
            connect: {
              id: Number(id),
            },
          },
        },
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "发生了一些错误" });
    }
  } else if (req.method === "DELETE") {
    try {
      const user = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteHomes: {
            disconnect: {
              id: Number(id),
            },
          },
        },
      });
      res.status(200).json(user.favoriteHomes);
    } catch (e) {
      res.status(500).json({ message: "发生了一些错误" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported` });
  }
}
