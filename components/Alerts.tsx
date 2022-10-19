import { useAlerts } from "../shared/store";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Props = {};

const Alerts = (props: Props) => {
  const alerts = useAlerts((state) => state.alerts);
  const closeAlert = useAlerts((state) => state.deleteAlert);
  return (
    <>
      {alerts.length > 0 && (
        <Stack sx={{ px: { xs: 1, md: 8, lg: 18 } }} spacing={2} pt={2}>
          {alerts.map((a, i) => (
            <Alert
              variant="filled"
              key={i}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="medium"
                  onClick={() => {
                    closeAlert(i);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity={a.type === "SUC" ? "success" : "error"}
            >
              {a.message}
            </Alert>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Alerts;
