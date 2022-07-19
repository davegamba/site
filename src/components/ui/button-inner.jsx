import React, { Fragment } from "react"
import PropTypes from "prop-types"

import "../../scss/components/ui/_section-button.scss"

export default function ButtonInner({ title, subtitle }) {
  return (
    <Fragment>
      {title}
      {subtitle && <small>{subtitle}</small>}
    </Fragment>
  )
}

ButtonInner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
