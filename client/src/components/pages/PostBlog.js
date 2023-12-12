import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import moment from "moment";
import Loader from "../../components/Loader";
import Booking from "../../api/Booking";
import { io } from "socket.io-client";
const socket = io("/", {
  reconnection: true,
});

export const PostBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
  console.log(postRemoveLike);
  console.log(postAddLike);

  //display posts

  const showPosts = async () => {
    setLoading(true);
    try {
      const { data } = await Booking.get("/blog/posts/show");
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showPosts();
  }, []);

  // //socket.io
  // useEffect(() => {
  //   socket.on("add-like", (newPosts) => {
  //     console.log(newPosts);
  //     setPostAddLike(newPosts);
  //     setPostRemoveLike("");
  //   });
  //   socket.on("remove-like", (newPosts) => {
  //     setPostRemoveLike(newPosts);
  //     setPostAddLike("");
  //   });
  // }, []);
  //socket.io
  useEffect(() => {
    socket.on("add-like", (updatedPost) => {
      console.log(updatedPost);
      setPostAddLike(updatedPost);
      setPostRemoveLike("");
    });
    socket.on("remove-like", (updatedPost) => {
      setPostRemoveLike(updatedPost);
      setPostAddLike("");
    });
  }, []);

  let uiPosts =
    postAddLike.length > 0
      ? postAddLike
      : postRemoveLike.length > 0
      ? postRemoveLike
      : posts;

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Container sx={{ pt: 5, pb: 5, paddingLeft: 0, minHeight: "83vh" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              // spacing={{ xs: 2, md: 3 }}
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="space-between"
            >
              {loading ? (
                <Loader />
              ) : (
                uiPosts.map((post, index) => (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    key={index}
                    sx={{ width: "100%", margin: 0 }}
                  >
                    <PostCard
                      id={post._id}
                      title={post.title}
                      content={post.content}
                      image={post.image ? post.image.url : ""}
                      subheader={moment(post.createdAt).format("DD/MM/YYYY")}
                      comments={post.comments.length}
                      likes={post.likes.length}
                      likesId={post.likes}
                      showPosts={showPosts}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
