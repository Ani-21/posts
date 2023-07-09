import { Box } from "@mui/material";
import { Header } from "../components/Header";

interface Props {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};
