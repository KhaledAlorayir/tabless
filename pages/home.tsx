import Box from "@mui/material/Box";
import useUser from "../shared/hooks/auth/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import { supabase } from "../shared/supabase";
import { Link_type } from "../shared/types";
import Insert from "../components/home/Insert";
import LinkList from "../components/home/LinkList";
import Filter from "../components/home/Filter";
import AutoInsert from "../components/home/AutoInsert";

export const getStaticProps = async () => {
  const { data } = await supabase.from("link_type").select("*");
  const link_types: Link_type[] = data!;

  return {
    props: {
      link_types,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  link_types,
}) => {
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

  return (
    <>
      {data && (
        <Box px={4} height="100%">
          <Filter link_types={link_types} />
          <Insert link_types={link_types} />
          <LinkList />
          <AutoInsert />
        </Box>
      )}
    </>
  );
};

export default Home;
