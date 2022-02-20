import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Pagination } from "@pittica/gatsby-plugin-navigation"

import "../../scss/components/ui/_list-pagination.scss"

export default function ListPagination({ context }) {
  return (
    <div className={classNames("container", "is-clipped", "list-pagination")}>
      <Pagination context={context} />
    </div>
  )
}

ListPagination.propTypes = {
  context: PropTypes.object.isRequired,
}
