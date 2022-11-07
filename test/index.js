// import { PrismaClient } from '@prisma/client'
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function handler(req,res){
    try{

        const home = await prisma.home.create({
            data:{  
                image:null, 
                title:'纽约', 
                description:'金融中心观景房', 
                price:300, 
                guests:3, 
                beds:4,
                baths:5
            }
        })
        console.log('home', home)
       } catch (error) {
        console.log('error', error)
       }

}

;(async()=>{
    await handler()
})()

// async function getAllIds (){
//     const ids = await prisma.home.findMany({
//         select:{id:true}
//     })
//     console.log('ids', ids)
// }
// getAllIds()