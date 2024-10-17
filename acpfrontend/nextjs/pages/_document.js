import { Html, Head, Main, NextScript } from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/Prompt/Prompt-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Prompt/Prompt-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Prompt/Prompt-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Prompt/Prompt-Thin.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};