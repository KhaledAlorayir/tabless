import useLinks from "../../shared/hooks/db/useLinks";
import Grid from "@mui/material/Unstable_Grid2";
import LinkCard from "./LinkCard";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useState } from "react";
import { getParsedUrls } from "../../shared/Helpers";
import { Link, DomainList } from "../../shared/types";
import DomainListCard from "./DomainListCard";

type Props = {
  viewMode: 2 | 1;
};

const LinkList = ({ viewMode }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLinks();
  const links = useMemo(() => {
    const flat = data?.pages.flat();
    return viewMode === 1 ? flat : getParsedUrls(flat);
  }, [data, viewMode]);

  const viewMode1Data = links as Link[];
  const viewMode2Data = links as DomainList[];

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <Stack pt={5} px={8}>
        <LinearProgress />
      </Stack>
    );
  }

  return (
    <>
      {links && (
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
                {viewMode === 1 ? (
                  <>
                    {viewMode1Data.map((link) => (
                      <Grid key={link.id} xs={12} sm={4} md={4} xl={3}>
                        <LinkCard link={link} />
                      </Grid>
                    ))}
                  </>
                ) : (
                  <>
                    {viewMode2Data.map((list) => (
                      <Grid key={list.domain} xs={12} md={4} xl={3}>
                        <DomainListCard list={list} />
                      </Grid>
                    ))}
                  </>
                )}
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
