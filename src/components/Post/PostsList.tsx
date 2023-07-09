import { Link } from "react-router-dom";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { IPost } from "@/models/IPost";
import { Post } from "../widgets/PostWidget";

type Props = {
  posts: IPost[];
};
export const PostsList = ({ posts }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  if (isDesktop)
    return (
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item md={4}>
            <Link
              to={`/post/${post.id}/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post key={post.id} post={post} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );

  return (
    <Box width="100%" sx={{ gap: "1rem", margin: "0 auto" }}>
      {posts.map((post) => (
        <Link
          to={`/post/${post.id}/${post.userId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Post key={post.id} post={post} />
        </Link>
      ))}
    </Box>
  );
};

export default PostsList;
