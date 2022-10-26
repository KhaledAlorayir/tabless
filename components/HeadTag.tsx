type Props = {};
import Head from "next/head";

const HeadTag = (props: Props) => {
  const title = "tabless";
  const desc =
    "save your urls in one place and share them accros multiple devices";

  return (
    <Head>
      <title>Tabless</title>
      <meta name="twitter:card" content="Tabless: save your urls" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
    </Head>
  );
};

export default HeadTag;
