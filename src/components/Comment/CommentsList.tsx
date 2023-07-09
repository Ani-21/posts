import { Box } from "@mui/material";
import { IComment } from "@/models/IComment";
import { useScroll } from "@/hooks/useScroll";
import { Comment } from "./Comment";

type Props = {
  comments: IComment[];
};

export const CommentsList = ({ comments }: Props) => {
  const ref = useScroll(comments);
  return (
    <Box
      mb="1rem"
      sx={{
        overflow: "scroll",
        height: "60vh",
      }}
      ref={ref}
    >
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};
