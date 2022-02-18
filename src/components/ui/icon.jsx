import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default function Icon({ className, icon, children }) {
  if (children) {
    return (
      <span className="icon-text">
        <span className="icon">
          <i className={classNames(className, `fa-${icon}`)}></i>
        </span>
        <span>{children}</span>
      </span>
    )
  } else {
    return (
      <span className="icon">
        <i className={classNames(className, `fa-${icon}`)}></i>
      </span>
    )
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.any,
}

Icon.defaultProps = {
  className: "far",
}
