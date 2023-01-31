import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import LinkIcon from "@mui/icons-material/Link";
import MuiLink from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import isUrl from "is-url-superb";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { getFaviconUrl } from "../../shared/Helpers";
import { DomainList as ListType } from "../../shared/types";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import useDeleteLink from "../../shared/hooks/db/useDeleteLink";
import { useEdit } from "../../shared/store";

type Props = {
  list: ListType;
};

const DomainListCard = ({ list }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { mutate, isLoading, variables } = useDeleteLink();
  const setEdit = useEdit((store) => store.setEdit);

  return (
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
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar
                src={getFaviconUrl(list.urls[0].url)}
                alt="favicon"
                sx={{ width: 20, height: 20 }}
              >
                <LinkIcon />
              </Avatar>
              <Typography> {list.domain}</Typography>
            </Stack>
            <IconButton onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Stack>
        </ListSubheader>
      }
    >
      <Collapse in={isOpen} timeout="auto">
        {list.urls.map((link) => (
          <ListItem
            key={link.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <MuiLink
              href={link.url}
              target="_blank"
              rel="noopener"
              sx={{
                lineBreak: isUrl(link.title) ? "anywhere" : "auto",
              }}
            >
              {link.title}
            </MuiLink>
            <Stack direction="row">
              <IconButton onClick={() => setEdit(link)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => mutate(link.id)}
                disabled={isLoading && variables === link.id}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
};

export default DomainListCard;
