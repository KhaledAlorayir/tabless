import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { Link, Link_Insert } from "../../types";
import { useAlerts } from "../../store";

const addLink = async (values: Link_Insert): Promise<Link[]> => {
  const { data, error } = await supabase
    .from("link")
    .insert({
      title: values.title,
      url: values.url,
      tid: values.type,
    })
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};

const useAddLink = () => {
  const addAlert = useAlerts((state) => state.addAlert);
  const qc = useQueryClient();

  return useMutation(addLink, {
    onError: (e) =>
      addAlert({ message: "Ops! something went wrong", type: "ERR" }),
    onSuccess: (res) => {
      addAlert({ message: "link has been added!", type: "SUC" });
      qc.setQueryData(["links"], (data: Link[] | undefined) => {
        if (data) {
          const [newLink] = res;
          return [newLink, ...data];
        }
        return data;
      });
    },
  });
};

export default useAddLink;
