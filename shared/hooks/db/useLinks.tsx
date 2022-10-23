import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { useAlerts } from "../../store";
import { Link } from "../../types";
const PAGE_LIMIT = 32;

const getLinks = async ({ pageParam = 1 }: any) => {
  let to = pageParam * PAGE_LIMIT - 1;
  let from = (pageParam - 1) * PAGE_LIMIT;

  const { data, error } = await supabase
    .from("link")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);
  if (error) {
    throw error;
  }
  return data;
};

const useLinks = () => {
  const addAlert = useAlerts((state) => state.addAlert);

  return useInfiniteQuery<Link[]>(["links"], getLinks, {
    onError: (e) => {
      addAlert({ message: "Ops! something went wrong", type: "ERR" });
      console.log(e);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useLinks;
