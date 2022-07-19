import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Post } from "@pittica/gatsby-plugin-navigation"

import getCoverFallback from "../../utils/get-cover-fallback"

import "../../scss/components/ui/_article-navigation.scss"

export default function ArticlePagination({ next, previous }) {
  console.log(next)
  if (next || previous) {
    return (
      <section className={classNames("section", "article-navigation")}>
        <div className="container">
          <h2 className="title">Altri Articoli</h2>
          <Post
            next={next}
            previous={previous}
            iconNext={classNames("fas", "fa-right-long")}
            iconPrevious={classNames("fas", "fa-left-long")}
            styleNext={
              next
                ? { backgroundImage: `url(${getCoverFallback(next)})` }
                : null
            }
            stylePrevious={
              previous
                ? { backgroundImage: `url(${getCoverFallback(previous)})` }
                : null
            }
          />
        </div>
      </section>
    )
  } else {
    return null
  }
}

ArticlePagination.propTypes = {
  next: PropTypes.object,
  previous: PropTypes.object,
}
