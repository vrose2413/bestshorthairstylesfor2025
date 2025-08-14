import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "4em",
    maxWidth: "660px",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
}));

const PageHeader = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography variant="h1" gutterBottom align="center">
          Latest Posts
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
