import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "无权限" });
  }
  if (req.method === "POST") {
    // console.log('req', req)
    try {
      const {
        image = null,
        title,
        description,
        price,
        guests,
        beds,
        baths,
      } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      const home = await prisma.home.create({
        data: {
          image,
          title,
          description,
          price,
          guests,
          beds,
          baths,
          ownerId: user.id,
        },
      });
      res.status(200).json(home);
    } catch (error) {
      res.status(500).json({ message: "发生了一些错误" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported` });
  }
}
