import { Box, Typography } from "@mui/material";
import { PersonPin } from "@mui/icons-material";

import { IComment } from "@/models/IComment";

type Props = {
  comment: IComment;
};

export const Comment = ({ comment }: Props) => {
  return (
    <Box mb="1rem">
      <Box display="flex">
        <PersonPin />
        <Typography>{comment.email}</Typography>
      </Box>
      <Typography>{comment.body}</Typography>
    </Box>
  );
};
