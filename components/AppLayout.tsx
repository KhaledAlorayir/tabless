import { PropsWithChildren } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alerts from "../components/Alerts";
import Navbar from "../components/Navbar";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Alerts />
      <Container sx={{ flex: 1 }} maxWidth={false}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
