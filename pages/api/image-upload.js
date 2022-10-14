import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { image } = req.body;
      if (!image) {
        return res.status(500).json({ message: "没有照片" });
      }
    //   console.log("image", image);
      const type = image.match(/data:(.*);base64,/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!type || !base64FileData) {
        return res.status(500).json({ message: "图片无效" });
      } else {
        const fileName = nanoid();
        const ext = type.split("/")[1];
        const path = `${fileName}.${ext}`;

        console.log('path', path)

        const { data, error: uploadError } = await supabase.storage
          .from(process.env.SUPABASE_BUCKET)
          .upload(path, decode(base64FileData), {
            contentType:type,
            upsert: true,
          });
          console.log('data', data)
        if (uploadError) {
          throw new Error("图片存储失败");
        }
        const url = `${process.env.SUPABASE_URL.replace(
          ".co",
          ".in"
        )}/storage/v1/object/public/supavacation/${data?.path}`;
        return res.status(200).json({ url });
      }
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "服务器异常" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `HTTP 方法错误,应为POST!` });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
