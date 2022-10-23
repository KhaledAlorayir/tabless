import { supabase } from "../../supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const signinViaGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
  });

  if (error) {
    throw error;
  }
  return data;
};

const useGoogleAuth = () => {
  const qc = useQueryClient();

  return useMutation(signinViaGoogle, {
    onSuccess: () => {
      qc.invalidateQueries(["user"]);
    },
  });
};

export default useGoogleAuth;
