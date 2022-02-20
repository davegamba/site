import React from "react"
import classNames from "classnames"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"

import ArticleCell from "../components/ui/article-cell"
import ListPagination from "../components/ui/list-pagination"

export default function Category({
  data: {
    tag: { name },
    articles: { nodes },
  },
  location,
  pageContext,
}) {
  return (
    <div className="container">
      <Seo location={location} title={name} isBlogPost={false} />
      <section className="section">
        <header className="header">
          <h1 className="title">{name}</h1>
        </header>
      </section>
      <div className={classNames("columns", "is-multiline")}>
        {nodes.map(node => (
          <div
            className={classNames("column", "is-one-third")}
            key={`tag-${node.id}`}
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
  query TagTemplate(
    $id: String!
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale
    $stage: GraphCMS_Stage
  ) {
    tag: graphCmsTag(
      stage: { eq: $stage }
      id: { eq: $id }
      locale: { eq: $locale }
    ) {
      id
      name
    }
    articles: allGraphCmsArticle(
      limit: $limit
      skip: $skip
      filter: {
        stage: { eq: $stage }
        locale: { eq: $locale }
        categories: { elemMatch: { id: { eq: $id } } }
      }
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
      }
    }
  }
`
