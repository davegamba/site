import React from "react"
import classNames from "classnames"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Seo } from "@pittica/gatsby-plugin-seo"

import SocialSharing from "../components/social-sharing"
import Icon from "../components/ui/icon"

import "../scss/templates/_article.scss"

export default function Article({
  data: {
    page: {
      title,
      cover,
      content,
      categories,
      authors,
      published,
      formattedDate,
      excerpt,
    },
    next,
    previous,
  },
  location,
}) {
  const image =
    cover && cover.localFile
      ? getImage(cover.localFile.childImageSharp).images.fallback.src
      : null

  return (
    <article className="article">
      <Seo
        location={location}
        title={title}
        description={excerpt}
        image={image}
        isBlogPost={true}
        author={
          authors && authors.length > 0
            ? `${authors[0].firstName} ${authors[0].lastName}`
            : null
        }
      />
      <header>
        <section
          className={classNames("hero", "is-halfheight")}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="hero-body">
            <div className="has-text-centered">
              <h1 className="title">{title}</h1>
              <div className="meta">
                <Icon icon="clock">
                  <time dateTime={published}>{formattedDate}</time>
                </Icon>
              </div>
            </div>
          </div>
          {categories && categories.length > 0 && (
            <div className="hero-foot">
              <nav className={classNames("tabs", "is-boxed", "is-fullwidth")}>
                <div className="container">
                  <ul>
                    {categories.map(category => (
                      <li key={`category-${category.id}`}>
                        <Link
                          to={`/categories/${category.slug}`}
                          title={category.name}
                        >
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </section>
      </header>
      {content.html && content.html && (
        <div className="container">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content.html }}
          ></div>
        </div>
      )}
      {authors && authors.length > 0 && (
        <div className="container">
          <section className={classNames("section", "authors")}>
            <h2 className="title">Autori</h2>
            <div className={classNames("columns", "is-multiline")}>
              {authors.map(author => {
                const to = `/authors/${author.slug}`
                const name = `${author.firstName} ${author.lastName}`

                return (
                  <div
                    className={classNames("column", "is-one-third")}
                    key={`author-${author.id}`}
                  >
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          {author.image && author.image.localFile && (
                            <div className="media-left">
                              <Link to={to} title={name}>
                                <GatsbyImage
                                  image={getImage(
                                    author.image.localFile.childImageSharp
                                  )}
                                  alt={name}
                                  className={classNames("image", "is-96x96")}
                                />
                              </Link>
                            </div>
                          )}
                          <div className="media-content">
                            <p className="title">
                              <Link to={to} title={name}>
                                {name}
                              </Link>
                            </p>
                            {title && (
                              <p className="subtitle">
                                <Link to={to} title={name}>
                                  {author.title}
                                </Link>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      )}
      <SocialSharing location={location} title={title} />
    </article>
  )
}

export const pageQuery = graphql`
  query BlogTemplate($id: String!, $next: String, $previous: String) {
    page: graphCmsArticle(stage: { eq: PUBLISHED }, id: { eq: $id }) {
      id
      excerpt
      slug
      title
      published
      formattedDate
      content {
        html
      }
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1920, height: 1280, placeholder: BLURRED)
          }
        }
      }
      categories {
        id
        name
        slug
      }
      authors {
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
    }
    next: graphCmsArticle(stage: { eq: PUBLISHED }, id: { eq: $next }) {
      slug
      title
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 640, height: 440, placeholder: BLURRED)
          }
        }
      }
    }
    previous: graphCmsArticle(stage: { eq: PUBLISHED }, id: { eq: $previous }) {
      slug
      title
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 640, height: 440, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
