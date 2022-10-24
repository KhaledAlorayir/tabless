import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { useAlerts, useFilter } from "../../store";
import { Link } from "../../types";
import { getTypeQuery, getPagination } from "../../Helpers";
const PAGE_LIMIT = 32;

const getLinks = async ({ pageParam = 1 }: any) => {
  const { from, to } = getPagination(pageParam, PAGE_LIMIT);
  const { query, type } = useFilter.getState().filter;
  const typeQuery = getTypeQuery(type);

  const { data, error } = await supabase
    .from("link")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to)
    .filter("tid", "in", typeQuery)
    .or(`title.ilike.%${query}%,url.ilike.%${query}%`);

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
