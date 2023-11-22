import React from "react";
// import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import FormBooking from "./FormBooking";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minWidth: 360,
//     minHeight: 400,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// }));

export default function FormBookingCard() {
  // const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    // className={classes.root}
    <Card className="box-search-home">
      <CardContent className="h-[100%] ">
        <FormBooking />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
