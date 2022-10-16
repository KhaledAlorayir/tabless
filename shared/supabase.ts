import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const signinViaMagicLink = async () => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: "jnonkh@gmail.com",
  });
  if (error) {
    console.log("error");
  }
};

export const signout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("error");
  }
};
