import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "800px",
  },
  blogBody: {
    marginTop: "2rem",
    "& p": {
      ...theme.typography.body1,
      marginBottom: "1.5em",
    },
    "& h1, h2, h3, h4, h5": {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
      marginTop: "2rem",
    },
    "& a": {
      color: theme.palette.info.main,
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
      margin: "1.5em 0",
    },
  },
}));

const BlogBody = ({ content }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item className={classes.blogBody}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogBody;
