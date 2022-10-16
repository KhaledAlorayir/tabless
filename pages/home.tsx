import Box from "@mui/material/Box";
import useUser from "../shared/hooks/auth/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPage } from "next";

const home: NextPage = () => {
  const { data, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    let ignore = false;

    if (!isLoading && !data && !ignore) {
      router.push("/");
    }

    return () => {
      ignore = true;
    };
  }, [isLoading]);
  return <Box sx={{ height: "100%", backgroundColor: "red" }}>home</Box>;
};

export default home;
