import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link } from "gatsby"

import "../../scss/components/ui/_section-button.scss"

export default function Icon({ node, className }) {
  if (node.link.remoteTypeName === "Link") {
    return (
      <a
        href={node.link.url}
        title={node.link.title}
        className={classNames("section-button", "button", className)}
      >
        {node.title}
        {node.subtitle && <small>{node.subtitle}</small>}
      </a>
    )
  } else {
    return (
      <Link
        to={node.link.path}
        title={node.link.title}
        className={classNames("section-button", "button", className)}
      >
        {node.title}
        {node.subtitle && <small>{node.subtitle}</small>}
      </Link>
    )
  }
}

Icon.propTypes = {
  node: PropTypes.object.isRequired,
  className: PropTypes.string,
}

Icon.defaultProps = {
  className: "is-primary",
}
