import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
		<meta name="msvalidate.01" content="DFC8FE0CFA9E940DC03C73680013BCAB" />
<meta name="msvalidate.01" content="668CCF5BE79D5FB37A88F4393D4DE992" />
<meta name="msvalidate.01" content="44AC5C11FEB3A2615D2BD9A059BE569F" />
<meta name="msvalidate.01" content="65FB114EEC1996C75E9A5EFB6BF450B6" />
<meta name="msvalidate.01" content="071A49B40926D8EB491106C86E19649B" />
<meta name="msvalidate.01" content="75851E5FA9D195397BFF6E7BFE03EB95" />
<meta name="msvalidate.01" content="CE388492749ADE50F6880C942C048A6B" />
<meta name="google-site-verification" content="_LChBYHeIaK9QcspNPJQ4Gt2bXiJ_TecOab6HLSBU6Q" />
<meta name="google-site-verification" content="s0TFs-wjlrGQ4TrkbHBwmc-CKNLbI4ERQX0NZhCx6KE" />
<meta name="google-site-verification" content="R5YctAZl5kkN8tHu4k0yNJCxhRbHnBQV8IbhV5OTXqo" />
<meta name="google-site-verification" content="AooDDjayJZhYzsaNzB6JilE4DXlEt9eVURNp3CnRuhk" />
<meta name="google-site-verification" content="5xgqWJPSlhxZrjAC4kpbtEu6Ua0T2SQFaa8Ubf6w1Cs" />


          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
