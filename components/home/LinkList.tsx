import useLinks from "../../shared/hooks/db/useLinks";
import Grid from "@mui/material/Unstable_Grid2";
import LinkCard from "./LinkCard";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";
import { getFaviconUrl, getParsedUrls } from "../../shared/Helpers";
import { Link } from "../../shared/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import LinkIcon from "@mui/icons-material/Link";
import MuiLink from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

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
  const viewMode2Data = links as {
    domain: string;
    urls: Link[];
  }[];

  if (isLoading) {
    return (
      <Stack pt={5} px={8}>
        <LinearProgress />
      </Stack>
    );
  }
  //TODO union type problem

  /*
    finish desgin
    - list item
    - list item collabse

    split into components viewmod1 & 2

    //
    edit & delete func should be a hook to easily share
    update: no they are a couple of lines
  */
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
                      <Grid key={list.domain} xs={12} sm={4} md={4} xl={3}>
                        <List
                          sx={{ bgcolor: "action.disabledBackground" }}
                          subheader={
                            <ListSubheader
                              sx={{
                                bgcolor: "action.disabledBackground",
                                paddingY: 2,
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar
                                  src={getFaviconUrl(list.urls[0].url)}
                                  alt="favicon"
                                  sx={{ width: 20, height: 20 }}
                                >
                                  <LinkIcon />
                                </Avatar>
                                <Typography> {list.domain}</Typography>
                              </Stack>
                            </ListSubheader>
                          }
                        >
                          {list.urls.map((link) => (
                            <ListItem key={link.id}>
                              <MuiLink
                                href={link.url}
                                target="_blank"
                                rel="noopener"
                              >
                                {link.title}
                              </MuiLink>
                              <Box>
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                                <IconButton>
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
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
