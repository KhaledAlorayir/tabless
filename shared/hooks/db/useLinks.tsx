import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { useAlerts } from "../../store";
import { Link } from "../../types";

const getLinks = async () => {
  const { data, error } = await supabase
    .from("link")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

const useLinks = () => {
  const addAlert = useAlerts((state) => state.addAlert);
  return useQuery<Link[]>(["links"], getLinks, {
    onError: (e) => {
      addAlert({ message: "Ops! something went wrong", type: "ERR" });
      console.log(e);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useLinks;
