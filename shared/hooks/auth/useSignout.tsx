import { supabase } from "../../supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

const useSignout = () => {
  const qc = useQueryClient();

  return useMutation(signout, {
    onSuccess: () => {
      qc.invalidateQueries(["user"]);
    },
  });
};

export default useSignout;
