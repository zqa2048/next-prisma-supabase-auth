import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient} from '@prisma/client'
import { useRouter } from 'next/router'

const prisma = new PrismaClient()



const ListedHome = (home = null) => {
  const router = useRouter()
  if(router?.isFallback){
    return 'Loading...'
  }
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {home?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li>
                <span>{home?.guests ?? 0} 位</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{home?.beds ?? 0} 床</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{home?.baths ?? 0} 浴室</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ListedHome


export async function getStaticPaths(){

  const homes = await prisma.home.findMany({
    select:{id:true}
  })

  return {
    paths: homes.map(home=>({
      params:{id:home.id+''}
    })),
    fallback: true
  }
}

export async function getStaticProps({params}){
  const home = await prisma.home.findMany({
    where:{ id: +params.id}
  })
  if(home){
    return {
      props:JSON.parse(JSON.stringify(home[0]))
    }
  }

  return {
    redirect:{
      destination:'/',
      permanent:false,
    }
  }
}