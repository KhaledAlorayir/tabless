import useLinks from "../../shared/hooks/db/useLinks";
import Grid from "@mui/material/Unstable_Grid2";
import LinkCard from "./LinkCard";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";
import { getParsedUrls } from "../../shared/Helpers";
import { Link } from "../../shared/types";

type Props = {
  viewMode: 2 | 1;
};

const LinkList = ({ viewMode }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLinks();
  const links = useMemo(() => {
    const flat = data?.pages.flat();
    return viewMode === 1 ? (flat as Link[]) : getParsedUrls(flat);
  }, [data, viewMode]);

  if (isLoading) {
    return (
      <Stack pt={5} px={8}>
        <LinearProgress />
      </Stack>
    );
  }
  //TODO union type problem
  return (
    <>
      {links && viewMode === 1 && (
        <>
          {links.length > 0 ? (
            <InfiniteScroll
              dataLength={links.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={
                isFetchingNextPage && (
                  <Stack alignItems="center" my={4}>
                    <CircularProgress />
                  </Stack>
                )
              }
              style={{ overflow: "unset" }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                mb={2}
              >
                {links.map((l) => (
                  <Grid key={l.id} xs={12} sm={4} md={4} xl={3}>
                    <LinkCard link={l} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          ) : (
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Typography variant="h6">No links! 🧙‍♂️</Typography>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;
