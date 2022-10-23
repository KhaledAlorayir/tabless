import { useAlerts } from "../shared/store";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

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

/*
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

*/
