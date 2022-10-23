import { Link } from "../../shared/types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import useDeleteLink from "../../shared/hooks/db/useDeleteLink";
import { useEdit } from "../../shared/store";

type Props = {
  link: Link;
};

const LinkCard = ({ link }: Props) => {
  const { mutate, isLoading } = useDeleteLink();
  const setEdit = useEdit((store) => store.setEdit);

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="a"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", display: "block" }}
          color="textPrimary"
        >
          {link.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dayjs(link.created_at).format("hh:mm a - MMM D, YYYY")}
          {link.tid === 1 ? " 😊" : " 😢"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          Go
        </Button>
        <Button onClick={() => setEdit(link)} size="small">
          Edit
        </Button>
        <LoadingButton
          onClick={() => {
            mutate(link.id);
          }}
          size="small"
          color="error"
          loading={isLoading}
        >
          delete
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default LinkCard;
