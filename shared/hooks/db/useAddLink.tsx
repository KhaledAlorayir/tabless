import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { Link, Link_Insert } from "../../types";
import { useAlerts } from "../../store";

const addLink = async (values: Link_Insert) => {
  const { error } = await supabase.from("link").insert({
    title: values.title,
    url: values.url,
    tid: values.type,
  });

  if (error) {
    throw error;
  }
};

const useAddLink = () => {
  const addAlert = useAlerts((state) => state.addAlert);
  const qc = useQueryClient();

  return useMutation(addLink, {
    onError: (e) =>
      addAlert({ message: "Ops! something went wrong", type: "ERR" }),
    onSuccess: () => {
      qc.invalidateQueries(["links"], { refetchPage: (_, i) => i === 0 });
      addAlert({ message: "link has been added!", type: "SUC" });
    },
  });
};

export default useAddLink;
