import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";

const getAuth = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session?.user || null;
};

const useUser = () => {
  return useQuery(["user"], getAuth);
};

export default useUser;
