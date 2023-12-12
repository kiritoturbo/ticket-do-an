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
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Booking from "../api/Booking";
//import image from '../images/blog.jpg'

const PostCard = ({
  id,
  title,
  subheader,
  image,
  content,
  comments,
  likes,
  showPosts,
  likesId,
}) => {
  const { userInfo } = useSelector((state) => {
    return state.authReducer;
  });
  //add like
  const addLike = async () => {
    const token = window.localStorage.getItem("token");
    const refreshToken = window.localStorage.getItem("refreshtoken");

    const makeLikeRequest = async (accessToken) => {
      try {
        const { data } = await axios.put(
          `http://localhost:2020/blog/addlike/post/${id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("likes", data.post);

        // if (data.success === true) {
        //   showPosts();
        // }
      } catch (error) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Error adding like");
      }
    };

    try {
      await makeLikeRequest(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
          // Retry the like post request with the new token
          await makeLikeRequest(refreshData.data.accessToken);
        } catch (refreshError) {
          console.log(refreshError);
          toast.error("Failed to refresh token");
        }
      }
    }
  };

  //remove like
  const removeLike = async () => {
    console.log(1);
    const token = window.localStorage.getItem("token");
    const refreshToken = window.localStorage.getItem("refreshtoken");

    const makeLikeRequest = async (accessToken) => {
      try {
        const { data } = await axios.put(
          `http://localhost:2020/blog/removelike/post/${id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("remove", data.post);

        // if (data.success === true) {
        //   showPosts();
        // }
      } catch (error) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Error remove like");
      }
    };

    try {
      await makeLikeRequest(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
          // Retry the like post request with the new token
          await makeLikeRequest(refreshData.data.accessToken);
        } catch (refreshError) {
          console.log(refreshError);
          toast.error("Failed to refresh token");
        }
      }
    }
  };

  return (
    <Card
      sx={{
        // maxWidth: 345,
        width: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      <Link to={`/blog/post/${id}`}>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {/* {content} */}

          <Box
            component="span"
            dangerouslySetInnerHTML={{
              __html: content.split(" ").slice(0, 10).join(" ") + "...",
            }}
          ></Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {likesId.includes(userInfo && userInfo?.user) ? (
              <IconButton onClick={removeLike} aria-label="add to favorites">
                <FavoriteIcon sx={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton onClick={addLike} aria-label="add to favorites">
                <FavoriteBorderIcon sx={{ color: "red" }} />
              </IconButton>
            )}
            {likes} Like(s)
          </Box>
          <Box>
            {comments}
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
