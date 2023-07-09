import { Box, SelectChangeEvent } from "@mui/material";
import { PageLayout } from "../layout";
import PostsList from "../../components/Post/PostsList";
import { IPost } from "../../models/IPost";
import { useState, useCallback } from "react";
import { useFetch } from "usehooks-ts";
import { baseUrl } from "../../const";
import { PostSelector } from "../../components/Post/PostSelector";

import { LoadPage } from "../loadPage";

export const PostsPage = () => {
  const [allPosts, setAllPosts] = useState(false);
  const [userId, setUserId] = useState(1);

  const postsUrl = `${baseUrl}/posts`;
  const userPostsUrl = `${baseUrl}/users/${userId}/posts`;

  const { data: posts } = useFetch<IPost[]>(postsUrl);

  const { data: userPosts } = useFetch<IPost[]>(userPostsUrl);

  const handleChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setUserId(e.target.value as number);
    setAllPosts(false);
  }, []);

  const handleShowAllPosts = useCallback(() => setAllPosts(true), []);

  return (
    <PageLayout>
      {!posts || !userPosts ? (
        <LoadPage />
      ) : (
        <>
          <PostSelector
            userId={userId}
            handleChange={handleChange}
            handleShowAllPosts={handleShowAllPosts}
          />

          <Box width="100%" padding="2rem 6%">
            <PostsList posts={allPosts ? posts : userPosts} />
          </Box>
        </>
      )}
    </PageLayout>
  );
};
