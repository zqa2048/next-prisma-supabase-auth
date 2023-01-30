import Layout from '@/components/Layout';
import Grid from '@/components/Grid';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  console.log("1111 :>> ", 1111);
  const homes = await prisma.home.findMany();
  console.log("homes :>> ", homes);
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}


export default function Home({homes=[]}) {

  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">
        最受好评的住宿地点
      </h1>
      <p className="text-gray-500">
        探索世界上一些最好的地方
      </p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
}
