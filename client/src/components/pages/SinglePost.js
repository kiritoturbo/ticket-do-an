import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Divider } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import CommentList from "../../components/CommentList";
import Booking from "../../api/Booking";
import { io } from "socket.io-client";

const socket = io("https://ticket-do-an.vercel.app", {
  reconnection: true,
});

const SinglePost = () => {
  const { userInfo } = useSelector((state) => {
    return state.authReducer;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);
  console.log(commentsRealTime);

  const { id } = useParams();
  //fetch single post
  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await Booking.get(`/blog/post/${id}`);
      // console.log(data)
      setTitle(data.post.title);
      setContent(data.post.content);
      setImage(data.post.image.url);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
      setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displaySinglePost();
  }, []);

  useEffect(() => {
    console.log("SOCKET IO", socket);
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  // add comment
  const addComment = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const refreshToken = window.localStorage.getItem("refreshtoken");

    try {
      const { data } = await Booking.put(
        `/blog/comment/post/${id}`,
        { comment },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      if (data.success === true) {
        setComment("");
        toast.success("comment added");
        // displaySinglePost();
        socket.emit("comment", data.post.comments);
      }
    } catch (error) {
      if (error.response && error.response.status === 401 && refreshToken) {
        // If token has expired and refreshToken is available, refresh the token
        try {
          const refreshData = await Booking.post(
            "/authentication/refresh-token",
            { refreshToken }
          );

          // Update the token in local storage and axios headers
          window.localStorage.setItem("token", refreshData.data.accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshData.data.accessToken}`;

          // Retry the comment post request with the new token
          const { data } = await Booking.put(
            `/blog/comment/post/${id}`,
            { comment },
            {
              headers: {
                authorization: `Bearer ${refreshData.data.accessToken}`,
              },
            }
          );

          console.log(data);

          if (data.success === true) {
            setComment("");
            displaySinglePost();
            toast.success("Comment added after token refresh");
          }
        } catch (refreshError) {
          console.log(refreshError);
          toast.error("Failed to refresh token");
        }
      } else {
        console.log(error);
        toast.error(error.response?.data?.error || "Error adding comment");
      }
    }
  };

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : comments;
  console.log(uiCommentUpdate);

  return (
    <>
      <Box
        sx={{
          bgcolor: "#fafafa",
          display: "flex",
          justifyContent: "center",
          pt: 4,
          pb: 4,
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Card sx={{ maxWidth: 1000, height: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={title}
                subheader={moment(createdAt).format("MMMM DD, YYYY")}
              />
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <Box
                    component="span"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></Box>
                </Typography>
                <Divider variant="inset" />
                {/* add coment list */}
                {comments.length === 0 ? (
                  ""
                ) : (
                  <Typography variant="h5" sx={{ pt: 3, mb: 2 }}>
                    Comments:
                  </Typography>
                )}

                {uiCommentUpdate.map((comment) => (
                  <CommentList
                    key={comment._id}
                    name={comment.postedBy.name}
                    text={comment.text}
                  />
                ))}

                {userInfo ? (
                  <>
                    <Box sx={{ pt: 1, pl: 3, pb: 3, bgcolor: "#fafafa" }}>
                      <h2>Add your comment here!</h2>
                      <form onSubmit={addComment}>
                        <TextareaAutosize
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          aria-label="minimum height"
                          minRows={3}
                          placeholder="Add a comment..."
                          style={{ width: 500, padding: "5px" }}
                        />
                        <Box sx={{ pt: 1 }}>
                          <Button type="submit" variant="contained">
                            Comment
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </>
                ) : (
                  <>
                    <Link to="/login"> Log In to add a comment</Link>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </>
  );
};

export default SinglePost;
