import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import RippleButton from "@/components/RippleButton";
import toast from "react-hot-toast";

export async function getServerSideProps() {
  const homes = await prisma.home.findMany({
    skip: 0,
    take: 4,
  });

  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}

export default function Home({ homes = [] }) {
  const [isHave, setIsHave] = useState(true);
  const [page, setPage] = useState(1);
  const [list, setList] = useState(homes);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`api/homes/fetch`, { page });
      if (data?.length < 4) {
        setIsHave(false);
        toast.success("全部加载完毕");
        if (data?.length > 0) {
          setList([...list, ...data]);
        }
      } else {
        setList([...list, ...data]);
      }
    })();
  }, [page]);

  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">最受好评的住宿地点</h1>
      <p className="text-gray-500">探索世界上一些最好的地方</p>
      <div className="mt-8">
        <Grid homes={list} />
      </div>
      {isHave && (
        <div className="load_more">
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <RippleButton title={"加载更多"}></RippleButton>
          </button>
        </div>
      )}
    </Layout>
  );
}
