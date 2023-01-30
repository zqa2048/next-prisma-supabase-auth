import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "未登录" });
  }
  const { id } = req.query;

  if (req.method === "PUT") {
    // console.log('req', req)
    console.log("id :>> ", id);
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

      console.log("added to fav", user);
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
