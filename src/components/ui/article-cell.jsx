import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Icon from "./icon"

import "../../scss/components/ui/_article-cell.scss"

export default function ArticleCell({
  node: { cover, slug, date, title, excerpt, published, categories },
}) {
  return (
    <article className="article-cell">
      <header>
        {cover && cover.localFile && (
          <Link to={`/${slug}`} title={title}>
            <GatsbyImage
              image={getImage(cover.localFile.childImageSharp)}
              alt={title}
            />
          </Link>
        )}
        <div className={classNames("columns", "meta")}>
          <div className={classNames("column", "is-half")}>
            <Icon icon="clock">
              <time dateTime={published}>{date}</time>
            </Icon>
          </div>
          <div className={classNames("column", "is-half")}>
            {categories && (
              <ul className="catlist">
                {categories.map(category => (
                  <li key={`category-${category.id}`}>
                    <Link
                      to={`/categories/${category.slug}`}
                      title={category.name}
                    >
                      <Icon icon="folder">{category.name}</Icon>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <h2 className="title">
        <Link to={`/${slug}`} title={title}>
          {title}
        </Link>
      </h2>
      {excerpt && (
        <p className="excerpt">
          <Link to={`/${slug}`} title={title}>
            {excerpt}
          </Link>
        </p>
      )}
    </article>
  )
}

ArticleCell.propTypes = {
  node: PropTypes.object,
}
