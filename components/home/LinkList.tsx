import useLinks from "../../shared/hooks/db/useLinks";
import Grid from "@mui/material/Unstable_Grid2";
import LinkCard from "./LinkCard";

type Props = {};

const LinkList = (props: Props) => {
  const { data, isLoading } = useLinks();
  /* loading & empty handling */
  return (
    <Grid
      p={4}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data &&
        data.map((l) => (
          <Grid key={l.id} xs={12} sm={4} md={4} xl={3}>
            <LinkCard link={l} />
          </Grid>
        ))}
    </Grid>
  );
};

export default LinkList;
