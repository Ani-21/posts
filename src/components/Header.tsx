import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { LightMode, DarkMode, Menu, Close } from "@mui/icons-material";
import { FlexBetween } from "./FlexBetween";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setMode } from "../store/postSlice";

export const Header = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useTheme();

  const blueLight = theme.palette.text.secondary;
  const background = theme.palette.background.paper;

  return (
    <FlexBetween padding="1rem 6%">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={blueLight}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          POSTS APP
        </Typography>
      </FlexBetween>

      {isDesktop ? (
        <FlexBetween gap="2rem">
          <IconButton
            onClick={() => {
              dispatch(setMode());
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: "#000000" }} />
            )}
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isDesktop && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          sx={{
            backgroundColor: background,
          }}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => {
                dispatch(setMode());
              }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: "#000000" }} />
              )}
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h4">Home</Typography>
            </Link>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};
