import Head from "next/head";
import { Container, Grid } from "@material-ui/core";

export default function Layout({ children, sidebar, ...meta }) {
  return (
    <>
      <Head>
        <title>{meta.title || "Angel Falls Christmas"}</title>
        <meta name="description" content={meta.description || ""} />
      </Head>
      <main>
        <Container maxWidth="lg" style={{ marginTop: "2em" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={sidebar ? 8 : 12}>
              {children}
            </Grid>
            {sidebar && (
              <Grid item xs={12} md={4}>
                {sidebar}
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
}