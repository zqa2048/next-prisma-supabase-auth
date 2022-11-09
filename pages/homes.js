import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
    const session = await getSession(context);

    // If not, redirect to the homepage
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const homes = await prisma.home.findMany({
        where: { owner: { email: session.user.email } },
        orderBy: { createdAt: 'desc' },
      });
      return {
        props: {
          homes: JSON.parse(JSON.stringify(homes)),
        },
      };
}

const Homes = ({ homes = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Your listings</h1>
      <p className="text-gray-500">
        管理您的房源并更新房源
      </p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
};

export default Homes;