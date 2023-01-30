import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

export async function getServerSideProps(context) {
  // Check if user is authenticated
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

  // Get all homes from the authenticated user
  const { favoriteHomes } = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      favoriteHomes: true,
    },
  });

  // Pass the data to the Homes component
  return {
    props: {
      homes: JSON.parse(JSON.stringify(favoriteHomes)),
    },
  };
}

const Favorites = ({ homes = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">喜欢列表</h1>
      <p className="text-gray-500">管理您的房源并更新房源</p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
};

export default Favorites;
