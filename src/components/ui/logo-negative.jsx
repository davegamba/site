import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function LogoNegative() {
  const {
    site: {
      siteMetadata: { title },
    },
    file: { logo },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "logo-negative" }
        ext: { eq: ".svg" }
      ) {
        logo: publicURL
      }
    }
  `)

  return <img src={logo} alt={title} width="150" height="43" />
}
