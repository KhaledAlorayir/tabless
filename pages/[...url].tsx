import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { buildUrl } from "build-url-ts";
import isUrl from "is-url-superb";
import getMetaData from "metadata-scraper";
import useUser from "../shared/hooks/auth/useUser";
import useAddLink from "../shared/hooks/db/useAddLink";
import { useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useAutoAdd } from "../shared/store";

type Props = {
  url: string | null;
  title: string | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  if (query.url) {
    const arr = query.url as string[];
    arr[0] += "/";
    const joined = arr.join("/");

    delete query.url;
    const keys = Object.keys(query);

    let parsed_url = "";

    if (keys.length > 0) {
      parsed_url = buildUrl(joined, { queryParams: { ...query } });
    } else {
      parsed_url = buildUrl(joined);
    }

    if (isUrl(parsed_url)) {
      let parsed_title = "";
      try {
        const { title } = await getMetaData(parsed_url);
        parsed_title = title || "";
      } catch (err) {
        parsed_title = parsed_url;
      }

      parsed_title =
        parsed_title.length > 80 ? parsed_title.substring(0, 80) : parsed_title;

      return {
        props: {
          url: parsed_url,
          title: parsed_title,
        },
      };
    }
  }

  return {
    props: {
      url: null,
      title: null,
    },
  };
};

const AddUrl: NextPage<Props> = ({ url, title }) => {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const { mutate: Add, isLoading: AddLoading } = useAddLink();
  const isDone = useRef(false);
  const set = useAutoAdd((store) => store.set);

  useEffect(() => {
    if (!userLoading && url && title) {
      if (isDone.current) return;
      if (user) {
        Add(
          { title, url, type: 1 },
          {
            onSuccess: () => router.push("/home"),
          }
        );
      } else {
        set(title, url);
        router.push("/auth");
      }
    }

    () => (isDone.current = true);
  }, [userLoading]);

  if (!url || !title) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Typography textAlign="center" variant="h6">
          the provided url has been rejected! 👨‍✈️, make sure its a valid url
        </Typography>
      </Stack>
    );
  }

  if (AddLoading) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return <div></div>;
};

export default AddUrl;
