import Box from "@mui/material/Box";
import { NextPage } from "next";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import useGoogleAuth from "../shared/hooks/auth/useGoogleAuth";
import CircularProgress from "@mui/material/CircularProgress";
import MagicLink from "../components/auth/MagicLink";
import useUser from "../shared/hooks/auth/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth: NextPage = () => {
  const { mutate: googleAuth, isLoading: gLoading } = useGoogleAuth();
  const { data, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      router.push("/");
    }
  }, [data, isLoading]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {!gLoading ? (
        <Box
          sx={{
            backgroundColor: "divider",
            py: "4rem",
            px: "2rem",
            borderRadius: "1rem",
            boxShadow: "1rem",
            width: { xs: "100%", md: "40%", lg: "30%" },
          }}
        >
          <Button
            variant="outlined"
            color="info"
            sx={{
              p: "1rem",
              mb: "1rem",
              width: "100%",
            }}
            startIcon={<GoogleIcon />}
            onClick={() => {
              googleAuth();
            }}
          >
            Sign in via Google
          </Button>
          <MagicLink />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Auth;
