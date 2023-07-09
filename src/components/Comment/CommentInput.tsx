import { useState } from "react";
import { Box, Button, InputBase } from "@mui/material";

import { baseUrl } from "@/const";
import { useAppDispatch } from "@/store/hooks";
import { addComment, setActionState } from "@/store/postSlice";

import { IComment } from "@/models/IComment";
import { IActionState } from "@/models/IActionState";

type Props = {
  postId: number;
};

type CommentResponse = Omit<IComment, "email" | "postId">;

export const CommentInput = ({ postId }: Props) => {
  const [comment, setComment] = useState("");
  const commentsUrl = `${baseUrl}/comments`;
  const dispatch = useAppDispatch();

  const handlePostComment = async () => {
    try {
      const response = await fetch(commentsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          email: "user@mail.ru",
          body: comment,
        }),
      });

      if (response.status > 400) {
        dispatch(setActionState(IActionState.error));
        return;
      }
      const data: CommentResponse = await response.json();
      setComment("");
      dispatch(addComment({ ...data, postId, email: "user@mail.ru" }));
      dispatch(setActionState(IActionState.success));
    } catch (err) {
      dispatch(setActionState(IActionState.error));
    }
  };

  return (
    <Box display="flex">
      <InputBase
        sx={{ width: "100%" }}
        placeholder="Type a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button disabled={!comment} onClick={handlePostComment}>
        Post
      </Button>
    </Box>
  );
};
