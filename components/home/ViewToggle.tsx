import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Dispatch, SetStateAction } from "react";

type Props = {
  viewMode: 2 | 1;
  setViewMode: Dispatch<SetStateAction<2 | 1>>;
};

const ViewToggle = ({ setViewMode, viewMode }: Props) => {
  return (
    <ToggleButtonGroup
      exclusive
      orientation="horizontal"
      value={viewMode}
      onChange={(e, v) => setViewMode(v)}
      sx={{ position: "fixed", bottom: 15, left: 25 }}
    >
      <ToggleButton value={1}>
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value={2}>
        <ReorderIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
