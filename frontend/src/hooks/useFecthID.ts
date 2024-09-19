import { useState } from "react";

const useFetchID = ({
  api_function,
  transformData,
}: {
  api_function: (id: string) => any;
  transformData?: (data: any) => any;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);

  const fecthData = async (id: string) => {
    try {
      setIsloading(true);
      let res = await api_function(id);

      if (transformData) {
        res = transformData(res);
      }

      setData(res);
      setIsloading(false);

      return res;
    } catch (e) {
      setIsloading(false);
      throw e;
    }
  };

  return { isLoading, data, fecthData };
};

export { useFetchID };
