import Layout from '@/components/Layout';
import ListingForm from '@/components/ListingForm';
import axios from 'axios';
import {getSession} from 'next-auth/react'


export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session :>> ", session);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Create = () => {
  const addHome = (data) => axios.post("/api/homes", data);

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your home</h1>
        <p className="text-gray-500">
          Fill out the form below to list a new home.
        </p>
        <div className="mt-8">
          <ListingForm
            buttonText="添加房屋"
            redirectPath="/"
            onSubmit={addHome}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Create;