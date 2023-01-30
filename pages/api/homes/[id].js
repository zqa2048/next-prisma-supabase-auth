import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const prisma = new PrismaClient()

export default async function handler(req,res){
    const session = await getSession({req})


    console.log('session :>> ', session);
    if(!session){
        return res.status(401).json({message:'未登录'})
    }

    const user = await prisma.user.findUnique({
        where: {email:session.user.email},
        select: {listedHomes: true}
    })
    const id  = +req.query?.id
    if(!user?.listedHomes?.find(home=>home.id=== id)){
        return res.status(401).json({message:'无权限访问'})
    }
    console.log('id :>> ', +id);
    console.log('user :>> ', user);

    if(req.method ==='PATCH'){
        try {
            const home = await prisma.home.update({
                where:{id},
                data:req.body
            })
            res.status(200).json(home)
        } catch (error) {
            res.status(500).json({message:'发生了一些错误'})
        }
    }else if(req.method === 'DELETE'){
        try {
            const home = await prisma.home.delete({
                where:{id}
            })
            if(home.image){
                const path = home.image.split(`${process.env.SUPABASE_BUCKET}/`)?.[1]
                await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([path])
            }
            res.status(200).json(home)
        } catch (error) {
            res.status(500).json({message:'发生了一些错误'})
        }
    }
    else{
        res.setHeader('Allow',['PATCH'])
        res.status(405)
           .json({message:`HTTP 方法${req.method} 不支持`})
    }
}