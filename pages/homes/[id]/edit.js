import Layout from "@/components/Layout";
import ListingForm from "@/components/ListingForm";
import { getSession } from "next-auth/react";
import axios from "node_modules/axios/index";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const redirect = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  if (!session) {
    return redirect;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { listedHomes: true },
  });

  const id = +context.params.id;
  const home = user?.listedHomes?.find((home) => home.id === id);

  if (!home) {
    return redirect;
  }

  return {
    props: JSON.parse(JSON.stringify(home)),
  };
}
const Edit = (home = null) => {

    const handleOnSubmit = data => axios.patch(`/api/homes/${home.id}`,data)

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Edit your home</h1>
        <p className="text-gray-500">请填写下面的表格，更新您的房屋。</p>
        <div className="mt-8">
          {home ? (
            <ListingForm
              initialValues={home}
              buttonText="更新房屋"
              redirectPath={`/homes/${home.id}`}
              onSubmit={handleOnSubmit}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
