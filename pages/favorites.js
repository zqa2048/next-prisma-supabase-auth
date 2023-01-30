import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { favoriteHomes } = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favoriteHomes: true },
  });
  return {
    props: {
      homes: JSON.parse(JSON.stringify(favoriteHomes)),
    },
  };
}

const Homes = ({ homes = [] }) => {
  const [chenged, setChanged] = useState(false);
  useEffect(() => {}, [chenged]);
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">喜欢列表</h1>
      <p className="text-gray-500">管理您的房源并更新房源</p>
      <div className="mt-8">
        <Grid homes={homes} handle={setChanged} />
      </div>
    </Layout>
  );
};

export default Homes;
