import PropTypes from 'prop-types';
import Card from '@/components/Card';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useState, useEffect } from "react";
import axios from "node_modules/axios/index";

const Grid = ({ homes = [], handle }) => {
  const [favoList, setFavoList] = useState([]);
  const [changed, setChanged] = useState(false);
  const isEmpty = homes.length === 0;

  console.log("homes :>> ", homes);
  console.log("favoList :>> ", favoList);
  useEffect(() => {
    setChanged(!changed);
  }, []);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`api/user/favorites`);
      setFavoList(data ?? []);
    })();
  }, [changed]);

  const toggleFavorite = async (id) => {
    if (favoList.some((e) => e.id === id)) {
      await axios.delete(`api/homes/${id}/favorite`);
      console.log("delete favo:", id);
    } else {
      await axios.put(`api/homes/${id}/favorite`);
    }
    setChanged(!changed);
    handle?.(!changed);
  };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>暂无数据.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {homes.map((home) => (
        <Card
          key={home.id + ""}
          {...home}
          onClickFavorite={() => toggleFavorite(home.id)}
          favorite={favoList.some((e) => e.id === home.id)}
        />
      ))}
    </div>
  );
};

Grid.propTypes = {
  homes: PropTypes.array,
};

export default Grid;
