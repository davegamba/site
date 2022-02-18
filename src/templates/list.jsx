import React from "react"
import classNames from "classnames"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { Pagination } from "@pittica/gatsby-plugin-navigation"

import ArticleCell from "../components/ui/article-cell"

export default function List({
  data: {
    pages: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <div className="container">
      <Seo location={location} title="Guide" isBlogPost={false} />
      <section className="section">
        <header className="header">
          <h1 className="title">Guide</h1>
        </header>
      </section>
      <div className="columns">
        {nodes.map(node => (
          <div
            className={classNames("column", "is-one-third")}
            key={`article-${node.id}`}
          >
            <ArticleCell node={node} />
          </div>
        ))}
      </div>
      <Pagination context={pageContext} />
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
              gatsbyImageData(width: 640, height: 640)
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
