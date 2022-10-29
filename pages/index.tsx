import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import useUser from "../shared/hooks/auth/useUser";
import { useTheme as useThemeStore } from "../shared/store";
import { useTheme } from "@mui/material";

const Home: NextPage = () => {
  const { data } = useUser();
  const switchTheme = useThemeStore((store) => store.switchTheme);
  const {
    palette: { mode },
  } = useTheme();
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
        <Typography variant="h6" mb={3}>
          save your urls in one place and share them accros multiple devices 👻
        </Typography>
        <Typography variant="body1" mb={6}>
          you can add urls from the home page or just type{" "}
          <Typography component="span" color="primary">
            tabless.vercel.app/
          </Typography>{" "}
          in front of any url to save it!
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
      <Box position="absolute" bottom={15}>
        <Typography
          component="a"
          href="https://github.com/KhaledAlorayir"
          color="textSecondary"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none" }}
        >
          Made By Khaled Alorayir.
        </Typography>
        <Button onClick={switchTheme}>{mode === "light" ? "🌙" : "😎"}</Button>
      </Box>
    </Box>
  );
};

export default Home;
