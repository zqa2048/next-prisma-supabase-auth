import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import  toast from 'react-hot-toast'

const prisma = new PrismaClient();

const ListedHome = (home = null) => {
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const owner = await axios.get(`/api/homes/${home.id}/owner`);
          setIsOwner(owner?.id === session.user.id);
        } catch (e) {
          setIsOwner(false);
        }
      }
    })();
  }, [session?.user]);

  const deleteHome = async ()=>{
    let toastId
    try {
      toastId = toast.lading()
      setDeleting(true)
      await axios.delete(`/api/homes/${home.id}`)
      toast.success('删除成功',{id:toastId})
      router.push('/homes')
    } catch (error) {
      console.log('e :>> ', e);
      toast.error('无法删除',{id:toastId})
      setDeleting(false)
    }

  }

  if (router?.isFallback) {
    return "Loading...";
  }
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {home?.title ?? ""}
            </h1>
            <div style={{ width: 300 }}>
              <Image src={home?.image} width="100%" height="100%" />
            </div>
            <br />
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

          {isOwner ? (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => router.push(`/homes/${home.id}/edit`)}
                className="px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                编辑
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={deleteHome }
                className="rounded-md border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none transition disabled:bg-rose-500 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
              >
                删除
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
export default ListedHome;

export async function getStaticPaths() {
  const homes = await prisma.home.findMany({
    select: { id: true },
  });

  console.log("homes :>> ", homes);
  return {
    paths: homes.map((home) => ({
      params: { id: home.id + "" },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const home = await prisma.home.findMany({
    where: { id: +params.id },
  });
  console.log("home :>> ", home);
  if (home) {
    return {
      props: JSON.parse(JSON.stringify(home[0])),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
