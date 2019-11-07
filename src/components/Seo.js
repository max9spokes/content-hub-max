import React from "react"
import Helmet from "react-helmet"
export default function Seo({
  data: {
    title = "BNZ",
    description = "Online tools to make life easier",
    url = "https://bnz-uat.9spokes.io/content/",
    image,
    twitterUsername = "BNZ",
  },
}) {
  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      {image && (
        <meta
          name="og:image"
          content={`${image.startsWith("//") ? "https:" : ""}${image}`}
        />
      )}
      <meta name="og:type" content="websitarticlee" />
      {/* In order to use Facebook Insights you must add the app ID to your page. */}
      {/* <meta name="fb:app_id" content={facebook.appId} /> */}
      {/* Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && (
        <meta
          name="twitter:image"
          content={`${image.startsWith("//") ? "https:" : ""}${image}`}
        />
      )}{" "}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
    </Helmet>
  )
}
