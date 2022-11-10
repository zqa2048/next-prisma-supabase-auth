import { PrismaClient } from '@prisma/client'
import { func } from 'prop-types'

const prisma = new PrismaClient

export default async function handler(req,res){
    if(req.method === 'GET'){
        try {
            const { id } = req.query
            const { owner } = await prisma.home.findUnique({
                where:{id:+id},
                select:{owner:true}
            })
            res.status(200).json(owner);
        } catch (error) {
            console.log('error :>> ', error);
            res.status(500).json({ message: '发生了一些错误' });
        }
    }else {
        res.setHeader('Allow', ['GET']);
        res
          .status(405)
          .json({ message: `请求方法 ${req.method} 不支持.` });
      }
}