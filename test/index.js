// import { PrismaClient } from '@prisma/client'
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

/* async function handler(req,res){
    try {
      const { owner } = await prisma.home.findUnique({
        where: { id: 2 },
        select: { owner: true },
      });
    } catch (error) {}

}

;(async()=>{
    await handler()
})() */

// async function getAllIds (){
//     const ids = await prisma.home.findMany({
//         select:{id:true}
//     })
//     console.log('ids', ids)
// }
// getAllIds()


async function handler(req,res){
  try {

    const home = await prisma.home.findMany();
    console.log(home)
  } catch (error) {
    console.log('error', error)
  }
}

;(async()=>{
  await handler()
})()