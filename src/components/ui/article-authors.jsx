import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import "../../scss/components/ui/_article-authors.scss"

export default function ArticleAuthors({ nodes }) {
  if (nodes.length > 0) {
    return (
      <section className={classNames("section", "article-authors")}>
        <div className="container">
          <h2 className="title">{nodes.length > 1 ? "Autori" : "Autore"}</h2>
          <div className={classNames("columns", "is-multiline")}>
            {nodes.map(author => {
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
                          {author.title && (
                            <p className="subtitle">
                              <Link to={to} title={author.title}>
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
        </div>
      </section>
    )
  } else {
    return null
  }
}

ArticleAuthors.propTypes = {
  nodes: PropTypes.array.isRequired,
}

ArticleAuthors.defaultProps = {
  nodes: [],
}
