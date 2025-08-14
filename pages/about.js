import Layout from "components/layout/Layout";
import Social from "components/Social";

import { Container, Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  avator: {
    width: "8em",
    height: "8em",
    boxShadow: "0px 0px 10px 1px #b2b2b28f",
  },
}));

const About = () => {
  const classes = useStyles();

  const name = "Joseph Halford";  // Your name as a string
  const avatar =
    "https://images.ctfassets.net/atxm25972ze9/7y6t7fqxDPqJ21ZECdUV9D/0ace08faabfb401be8e89d689b04ae98/adult-1868750__340.jpg?h=250";

  return (
    <Layout
      title="About | Blog with Next.js and Contentful"
      description="This is a Blog Demo with Next.js and Contentful. You can see the code in github. And you can use the code to make your own blog."
    >
      <Container maxWidth="md">
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <Typography variant="h1" align="center" gutterBottom>
              About
            </Typography>
            <Typography variant="h2" align="center">
              Hello, my name is {name}.
            </Typography>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid
              item
              container
              md={4}
              direction="column"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Avatar alt={name} src={avatar} className={classes.avator} />
              </Grid>
              <Grid item>
                <Typography variant="h3">{name}</Typography>
              </Grid>
              <Social color />
            </Grid>

            <Grid item container md={8}>
              <Typography variant="body1" paragraph>
                {/* Replace this text with your actual introduction */}
                <strong>Welcome to my blog!</strong> I'm passionate about sharing
                ideas and stories that inspire and inform. Whether it's technology,
                lifestyle, or creativity, I love connecting with readers who want
                to explore fresh perspectives.
              </Typography>

              <Typography variant="body1" paragraph>
                When I'm not writing, I enjoy reading, cooking, and exploring the
                outdoors. Thanks for visiting my space — I hope you find something
                here that sparks your curiosity!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
