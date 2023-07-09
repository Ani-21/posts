import { Backdrop, CircularProgress } from "@mui/material";

export const LoadPage = () => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 50 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
