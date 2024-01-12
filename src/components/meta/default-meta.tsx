import { memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const title = 'Redduck Flow POC';
const description = 'Proof of Concept for Redduck Flow project';

export const DefaultMeta = memo(() => {
  const location = useLocation();
  const canonical = useMemo(
    () => `https://redduck-flow-poc.netlify.app${location.pathname}`,
    [location],
  );

  // @dev defaults should also be added to index.html with data-rh="true"
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:image"
        content="https://app.beefy.com/assets/meta/social20220521.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@redduck_ua" />
      <meta property="twitter:creator" content="@redduck_ua" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content="https://redduck-flow-poc.netlify.app/redduck-hero.png"
      />
    </Helmet>
  );
});
DefaultMeta.displayName = 'DefaultMeta';
