import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "usehooks-ts";

import { Box, Typography, useMediaQuery } from "@mui/material";

import { baseUrl } from "@/const";
import { IPost } from "@/models/IPost";
import { IComment } from "@/models/IComment";

import { User } from "@/components/widgets/UserWidget";
import { Post } from "@/components/widgets/PostWidget";
import { CommentsList } from "@/components/Comment/CommentsList";
import { CommentInput } from "@/components/Comment/CommentInput";
import { Toast } from "@/components/Toast/Toast";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setComments } from "@/store/postSlice";
import { comments } from "@/store/selectors";

import { LoadPage } from "../loadPage";
import { PageLayout } from "../layout";

export const PostPage = () => {
  const { id = "", userId = "" } = useParams();
  const postUrl = `${baseUrl}/posts/${id}`;
  const commentsUrl = `${baseUrl}/posts/${id}/comments`;

  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const { data: post } = useFetch<IPost>(postUrl);
  const { data: commentsData } = useFetch<IComment[]>(commentsUrl);

  const dispatch = useAppDispatch();

  const currentComments = useAppSelector(comments);

  useEffect(() => {
    dispatch(setComments(commentsData));
  }, [commentsData]);

  return (
    <PageLayout>
      {!post ? (
        <LoadPage />
      ) : (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isDesktop ? "flex" : "block"}
          gap="2rem"
          justifyContent="space-between"
          position="relative"
        >
          <Box
            sx={{
              flexBasis: isDesktop ? "26%" : null,
              mb: isDesktop ? null : "1rem",
            }}
          >
            <User userId={Number(userId)} fullInfo />
          </Box>
          <Box
            sx={{
              flexBasis: isDesktop ? "42%" : null,
              mb: isDesktop ? null : "1rem",
            }}
          >
            <Post post={post} />
          </Box>
          <Box
            sx={{
              flexBasis: isDesktop ? "26%" : null,
            }}
          >
            <Typography variant="h3" mb="0.75rem">
              Comments
            </Typography>
            <Box>
              <CommentsList comments={currentComments} />
              <CommentInput postId={Number(id)} />
            </Box>
            <Toast />
          </Box>
        </Box>
      )}
    </PageLayout>
  );
};
