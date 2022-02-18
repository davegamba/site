import React from "react"
import classNames from "classnames"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { Pagination } from "@pittica/gatsby-plugin-navigation"

import ArticleCell from "../components/ui/article-cell"

export default function Author({
  data: {
    author: { firstName, lastName, title, image },
    articles: { nodes },
  },
  location,
  pageContext,
}) {
  const name = `${firstName} ${lastName}`

  return (
    <div className="container">
      <Seo
        location={location}
        title={name}
        description={title}
        isBlogPost={false}
        author={name}
      />
      <section className="section">
        <header className="header">
          <div className="card">
            <div className="card-content">
              <div className="media">
                {image && image.localFile && (
                  <div className="media-left">
                    <GatsbyImage
                      image={getImage(image.localFile.childImageSharp)}
                      alt={name}
                      className={classNames("image", "is-96x96")}
                    />
                  </div>
                )}
                <div className="media-content">
                  <p className="title">{name}</p>
                  {title && <p className="subtitle">{title}</p>}
                </div>
              </div>
            </div>
          </div>
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
  query AuthorTemplate(
    $id: String!
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale
  ) {
    author: graphCmsAuthor(stage: { eq: PUBLISHED }, id: { eq: $id }) {
      id
      slug
      firstName
      lastName
      title
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 96, height: 96, placeholder: BLURRED)
          }
        }
      }
    }
    articles: allGraphCmsArticle(
      limit: $limit
      skip: $skip
      filter: {
        stage: { eq: PUBLISHED }
        locale: { eq: $locale }
        authors: { elemMatch: { id: { eq: $id } } }
      }
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
