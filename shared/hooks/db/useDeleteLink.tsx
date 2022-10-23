import { supabase } from "../../supabase";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAlerts } from "../../store";
import { Link } from "../../types";

const deleteLink = async (id: string) => {
  const { error } = await supabase.from("link").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

const useDeleteLink = () => {
  const addAlert = useAlerts((state) => state.addAlert);
  const qc = useQueryClient();

  return useMutation(deleteLink, {
    onError: (e) =>
      addAlert({ message: "Ops! something went wrong", type: "ERR" }),
    onSuccess: (_, id) => {
      addAlert({ message: "link has been deleted!", type: "SUC" });
      qc.setQueryData(["links"], (data: InfiniteData<Link[]> | undefined) => {
        if (data) {
          return {
            ...data,
            pages: data.pages.map((pages) =>
              pages.filter((link) => link.id !== id)
            ),
          };
        }
        return data;
      });
    },
  });
};

export default useDeleteLink;
