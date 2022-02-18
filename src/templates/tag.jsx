import React from "react"
import classNames from "classnames"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MarkdownRenderer } from "@pittica/gatsby-plugin-mdx-shortcodes"
import { Seo } from "@pittica/gatsby-plugin-seo"

import SocialSharing from "../components/social-sharing"

export default function Tag({
  data: {
    page: {
      name,
    },
  },
  location,
}) {
  return (
    <div></div>
  )
}

export const pageQuery = graphql`
  query TagTemplate($id: String!) {
    page: graphCmsTag(stage: { eq: PUBLISHED }, id: { eq: $id }) {
      id
      slug
      name
    }
  }
`
