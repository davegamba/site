require("dotenv").config()

const { getFeeds } = require("./src/utils/feed")
const locale = `${process.env.LOCALE.toLowerCase()}_${process.env.CULTURE.toUpperCase()}`
const siteUrl = process.env.URL || `https://${process.env.HOST}`

module.exports = {
  siteMetadata: {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    locale: {
      language: process.env.LOCALE.toLowerCase(),
      culture: process.env.CULTURE.toUpperCase(),
    },
    siteUrl,
    author: process.env.AUTHOR,
    organization: {
      company: process.env.ORG_COMPANY,
      address: process.env.ORG_ADDRESS_STREET,
      url: siteUrl,
      logo: new URL("/logo.jpg", siteUrl).href,
      zipCode: process.env.ORG_ADDRESS_ZIPCODE,
      city: process.env.ORG_ADDRESS_CITY,
      province: process.env.ORG_ADDRESS_PROVINCE,
      country: process.env.ORG_ADDRESS_COUNTRY,
      email: process.env.EMAIL,
      taxId: process.env.ORG_TAX_ID,
      vatId: process.env.ORG_VAT_ID,
      registryId: process.env.ORG_REGISTRY_ID,
    },
    newsletter: process.env.NEWSLETTER_URL,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/images`,
        name: `images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        locales: [locale],
        fragmentsPath: "fragments",
        typePrefix: "GraphCMS_",
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: `/share.jpg`,
        socials: {
          instagram: {
            username: process.env.INSTAGRAM_USERNAME,
            icon: "fab fa-instagram",
          },
          facebook: {
            page: process.env.FACEBOOK_PAGE,
            app: process.env.FACEBOOK_APP,
            icon: "fab fa-facebook",
          },
          youtube: {
            username: process.env.YOUTUBE_USERNAME,
            icon: "fab fa-youtube",
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: new URL("/sitemap-index.xml", siteUrl).href,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.TITLE,
        short_name: process.env.TITLE,
        start_url: `/`,
        background_color: process.env.COLOR_BACKGROUND,
        theme_color: process.env.COLOR_PRIMARY,
        display: `minimal-ui`,
        icon: `static/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        generator: process.env.AUTHOR,
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: getFeeds(siteUrl, [locale]),
      },
    },
    {
      resolve: `gatsby-plugin-readingtime`,
      options: {
        types: {
          GraphCMS_Article: ({ content: { text } }) => text,
        },
      },
    },
  ],
}
