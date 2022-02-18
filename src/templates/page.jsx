import React from "react"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"
import PageSection from "../components/ui/page-section"

export default function Page({
  data: {
    page: { title, sections },
  },
  location,
}) {
  return (
    <div>
      <Seo location={location} title={title} isBlogPost={false} />
      {sections.map((section, i) => (
        <PageSection key={`section-${i}`} node={section} />
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!) {
    page: graphCmsPage(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      title
      sections {
        title
        subtitle
        fullscreen
        content {
          html
        }
        backgroundColor {
          css
        }
        backgroundImage {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 1920, height: 1280, placeholder: BLURRED)
            }
          }
        }
        buttons {
          title
          subtitle
          link {
            ... on GraphCMS_Article {
              title
              path
              url
              remoteTypeName
            }
            ... on GraphCMS_Page {
              title
              path
              url
              remoteTypeName
            }
            ... on GraphCMS_Link {
              title
              url
              remoteTypeName
            }
          }
        }
      }
    }
  }
`
