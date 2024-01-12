import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

export interface MetaProps {
  title?: string;
  description?: string;
  noindex?: boolean;
}

export const Meta = memo(({ title, description, noindex }: MetaProps) => {
  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {title ? <meta property="og:title" content={title} /> : null}
      {title ? <meta property="twitter:title" content={title} /> : null}
      {description ? (
        <meta property="description" content={description} />
      ) : null}
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {description ? (
        <meta property="twitter:description" content={description} />
      ) : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}
    </Helmet>
  );
});
Meta.displayName = 'Meta';
