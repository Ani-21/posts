import { Box, Typography } from "@mui/material";
import { IPost } from "@/models/IPost";
import { WidgetWrapper } from "../WidgetWrapper";
import { User } from "./UserWidget";

type Props = {
  post: IPost;
};

export const Post = ({ post }: Props) => {
  return (
    <WidgetWrapper sx={{ mb: "1rem" }}>
      <User userId={post.userId} />
      <Box sx={{ height: "90px", overflow: "scroll" }}>
        <Typography sx={{ mt: "1rem" }}>{post.body}</Typography>
      </Box>
    </WidgetWrapper>
  );
};
