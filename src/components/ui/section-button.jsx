import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link } from "gatsby"

import ButtonInner from "./button-inner"

import "../../scss/components/ui/_section-button.scss"

export default function SectionButton({ node, className }) {
  if (node.link) {
    if (node.link?.remoteTypeName === "Link") {
      return (
        <a
          href={node.link.url}
          title={node.link.title}
          className={classNames("section-button", "button", className)}
        >
          <ButtonInner title={node.title} subtitle={node.subtitle} />
        </a>
      )
    } else {
      return (
        <Link
          to={node.link.path}
          title={node.link.title}
          className={classNames("section-button", "button", className)}
        >
          <ButtonInner title={node.title} subtitle={node.subtitle} />
        </Link>
      )
    }
  } else {
    return <ButtonInner title={node.title} subtitle={node.subtitle} />
  }
}

SectionButton.propTypes = {
  node: PropTypes.object.isRequired,
  className: PropTypes.string,
}

SectionButton.defaultProps = {
  className: "is-primary",
}
