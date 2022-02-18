import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { getImage } from "gatsby-plugin-image"

import SectionButton from "./section-button"

import "../../scss/components/ui/_page-section.scss"

export default function PageSection({ node }) {
  const style = {}

  if (node.backgroundColor && node.backgroundColor.css) {
    style.backgroundColor = node.backgroundColor.css
  }

  if (node.backgroundImage && node.backgroundImage.localFile) {
    const image = getImage(node.backgroundImage.localFile)

    if (image && image.images.fallback) {
      style.backgroundImage = `url('${image.images.fallback.src}')`
    }
  }

  return (
    <section
      className={classNames("page-section", "hero", {
        "is-fullheight": node.fullscreen,
      })}
      style={style}
    >
      <div className="container">
        <h3 className={classNames("title", "has-text-centered")}>
          {node.title}
        </h3>
        <h4 className={classNames("subtitle", "has-text-centered")}>
          {node.subtitle}
        </h4>
        {node.content && node.content.html && (
          <div dangerouslySetInnerHTML={{ __html: node.content.html }} />
        )}
        {node.buttons.map((button, i) => (
          <div key={`link-${i}`} className="has-text-centered">
            <SectionButton
              node={button}
              className={classNames(
                "is-primary",
                "is-large",
                "is-uppercase",
                "m-4"
              )}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

PageSection.propTypes = {
  node: PropTypes.object,
}
