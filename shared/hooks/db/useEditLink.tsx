import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { Link, Link_Update } from "../../types";
import { useAlerts } from "../../store";

const EditLink = async (values: Link_Update): Promise<Link[]> => {
  const { data, error } = await supabase
    .from("link")
    .update({
      title: values.title.trim(),
      url: values.url.trim(),
      tid: values.type,
    })
    .eq("id", values.id)
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};

const useEditLink = () => {
  const addAlert = useAlerts((state) => state.addAlert);
  const qc = useQueryClient();

  return useMutation(EditLink, {
    onError: (e) =>
      addAlert({ message: "Ops! something went wrong", type: "ERR" }),
    onSuccess: (res) => {
      addAlert({ message: "link has been updated!", type: "SUC" });
      qc.setQueryData(["links"], (data: InfiniteData<Link[]> | undefined) => {
        if (data) {
          const [updatedLink] = res;
          return {
            ...data,
            pages: data.pages.map((pages) =>
              pages.map((link) =>
                link.id !== updatedLink.id ? link : updatedLink
              )
            ),
          };
        }
        return data;
      });
    },
  });
};

export default useEditLink;
