import { supabase } from "../../supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signinViaMagicLink = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
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
