import { useCallback, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actionState } from "@/store/selectors";
import { setActionState } from "@/store/postSlice";

import { IActionState } from "@/models/IActionState";

const ToastMap = {
  [IActionState.error]: (
    <ErrorOutline
      sx={{
        color: "#ef5350",
      }}
    />
  ),
  [IActionState.success]: (
    <CheckCircleOutline
      sx={{
        color: "#4caf50",
      }}
    />
  ),
  [IActionState.none]: null,
};

export const ToastMessage = {
  [IActionState.success]: "Successfully posted a comment",
  [IActionState.error]: "Something went wrong...",
  [IActionState.none]: "",
};

export const Toast = () => {
  const currentActionState = useAppSelector(actionState);
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const dispatch = useAppDispatch();

  const handleRemoveToast = useCallback(
    () => dispatch(setActionState(IActionState.none)),
    []
  );

  const hasState = currentActionState !== IActionState.none;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (hasState) timer = setTimeout(handleRemoveToast, 4000);
    return () => clearTimeout(timer);
  }, [hasState]);

  return (
    hasState && (
      <Box
        display="flex"
        gap="0.75rem"
        p="0.75rem"
        borderRadius="1rem"
        sx={{
          boxShadow: 1,
          width: isDesktop ? "25%" : "100%",
          position: "absolute",
          left: 0,
          right: 0,
          margin: "0 auto",
        }}
      >
        <Box>{ToastMap[currentActionState]}</Box>
        <Typography>{ToastMessage[currentActionState]}</Typography>
      </Box>
    )
  );
};
