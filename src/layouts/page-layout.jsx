import React from "react"
import classNames from "classnames"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Navbar } from "@pittica/gatsby-plugin-navigation"
import { SocialFollow } from "@pittica/gatsby-plugin-seo"
import { Credits } from "@pittica/art"

import LogoNegative from "../components/ui/logo-negative"

import "../scss/layouts/_page-layout.scss"

export default function PageLayout({ children, location }) {
  const {
    site: {
      siteMetadata: { title, organization },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          organization {
            company
            address
            zipCode
            city
            province
            country
            taxId
            vatId
            registryId
          }
        }
      }
    }
  `)

  return (
    <div className="page-layout">
      <Navbar
        className={classNames("top-menu", "is-fixed-top")}
        location={location}
        startItems={[
          { to: "/about", label: "Chi Sono" },
          { to: "/articles", label: "Guide" },
        ]}
      >
        <Link to="/" title={title}>
          <LogoNegative />
        </Link>
      </Navbar>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column">
              <LogoNegative />
            </div>
            <div className={classNames("column", "has-text-centered")}>
              <SocialFollow />
            </div>
          </div>
          <div className="columns">
            <div className={classNames("column", "is-half")}>
              © {new Date().getFullYear()}, {organization.company}
            </div>
            <div className={classNames("column", "is-half", "has-text-right")}>
              <Credits />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
