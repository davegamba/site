import React from "react"
import classNames from "classnames"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"

import ArticleCell from "../components/ui/article-cell"
import ListPagination from "../components/ui/list-pagination"

export default function List({
  data: {
    pages: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <div>
      <Seo location={location} title="Guide" isBlogPost={false} />
      <section className="section">
        <div className="container">
          <header className="header">
            <h1 className="title">Guide</h1>
          </header>
        </div>
      </section>
      <div
        className={classNames(
          "columns",
          "is-gapless",
          "is-clipped",
          "is-multiline"
        )}
      >
        {nodes.map(node => (
          <div
            className={classNames(
              "column",
              "has-background-primary",
              "is-one-third-tablet",
              "is-one-third-desktop",
              "is-one-quarter-widescreen",
              "is-one-fifth-fullhd"
            )}
            key={`article-${node.id}`}
          >
            <ArticleCell node={node} />
          </div>
        ))}
      </div>
      <ListPagination context={pageContext} />
    </div>
  )
}

export const pageQuery = graphql`
  query ListTemplate($skip: Int!, $limit: Int!, $locale: GraphCMS_Locale) {
    pages: allGraphCmsArticle(
      limit: $limit
      skip: $skip
      filter: { stage: { eq: PUBLISHED }, locale: { eq: $locale } }
      sort: { fields: published, order: DESC }
    ) {
      nodes {
        id
        cover {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 800, height: 800)
            }
          }
        }
        slug
        date: formattedDate
        published
        title
        excerpt
        locale
        categories {
          id
          name
          slug
        }
      }
    }
  }
`
