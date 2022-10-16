import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import useUser from "../shared/hooks/auth/useUser";

const Home: NextPage = () => {
  const { data } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h2" fontWeight="700" mb={2}>
          Tabless 🦄
        </Typography>
        <Typography variant="h6" mb={6}>
          close your 36 tabs, save your urls in one place and share them accros
          multiple devices 👻
        </Typography>
        <Link href={data ? "/home" : "/auth"} passHref>
          <Button
            variant="contained"
            color="info"
            size="large"
            sx={{ width: "40%" }}
          >
            Try it 🤗
          </Button>
        </Link>
      </Box>
      <Typography
        position="absolute"
        bottom={15}
        component="a"
        href="https://github.com/KhaledAlorayir"
        color="textSecondary"
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        Made By Khaled Alorayir.
      </Typography>
    </Box>
  );
};

export default Home;
