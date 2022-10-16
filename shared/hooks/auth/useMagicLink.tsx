import { supabase } from "../../supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signinViaMagicLink = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    throw error;
  }
  return data;
};

const useMagicLink = () => {
  const qc = useQueryClient();

  return useMutation(signinViaMagicLink, {
    onSuccess: () => {
      qc.invalidateQueries(["user"]);
    },
  });
};

export default useMagicLink;
