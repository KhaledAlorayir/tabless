import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { Link_Insert } from "../../types";
import { useAlerts } from "../../store";

const addLink = async (values: Link_Insert) => {
  const { data, error } = await supabase.from("link").insert({
    title: values.title,
    url: values.url,
    tid: values.type,
  });

  if (error) {
    throw error;
  }

  return data;
};

const useAddLink = () => {
  const addAlert = useAlerts((state) => state.addAlert);

  return useMutation(addLink, {
    onError: (e) =>
      addAlert({ message: "Ops! something went wrong", type: "ERR" }),
    onSuccess: () => addAlert({ message: "link has been added!", type: "SUC" }),
  });
};

export default useAddLink;
