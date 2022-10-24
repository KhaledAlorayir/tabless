import { useAlerts } from "../shared/store";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props = {};

const Alerts = (props: Props) => {
  const alert = useAlerts((state) => state.alert);
  const closeAlert = useAlerts((state) => state.clearAlert);

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    closeAlert();
  };

  return (
    <>
      {alert && (
        <Snackbar
          key={Date.now()}
          open={!!alert}
          autoHideDuration={6000}
          onClose={close}
        >
          <Alert
            onClose={close}
            variant="filled"
            severity={alert.type === "SUC" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {alert?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Alerts;
