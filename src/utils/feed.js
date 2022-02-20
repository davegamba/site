require("dotenv").config()

exports.getFeeds = (siteUrl, locales) =>
  locales.map(locale => this.getFeed(siteUrl, locale))
exports.getFeed = (siteUrl, locale) => ({
  serialize: ({
    query: {
      allGraphCmsArticle: { nodes },
    },
  }) =>
    nodes.map(node => {
      const url = new URL(`/blog/${node.slug}`, siteUrl).href
      const element = {
        title: node.title,
        description: node.excerpt,
        date: node.published,
        url,
        custom_elements: [
          { "content:encoded": node.content.html },
          { "dc:date": node.date },
        ],
        categories: node.categories.map(({ name }) => name),
      }

      if (node.authors.length > 0) {
        element.author = `${node.authors[0].email || process.env.EMAIL} (${
          node.authors[0].firstName
        } ${node.authors[0].lastName})`
        element.custom_elements.push({
          "dc:creator": `${node.authors[0].firstName} ${node.authors[0].lastName}`,
        })
      } else {
        element.author = `${process.env.EMAIL} (${process.env.AUTHOR})`
        element.custom_elements.push({
          "dc:creator": process.env.AUTHOR,
        })
      }

      if (node.cover && node.cover.localFile) {
        element.enclosure = {
          url: new URL(node.cover.localFile.publicURL, siteUrl).href,
          length: node.cover.localFile.size,
          size: node.cover.localFile.size,
          type: node.cover.mimeType,
        }
        element.custom_elements.push({
          "media:content": [
            {
              _attr: {
                url: new URL(node.cover.localFile.publicURL, siteUrl).href,
                medium: "image",
                width: node.cover.width,
                height: node.cover.height,
              },
            },
            { "media:title": node.cover.fileName },
            {
              "media:credit": node.cover.credits
                ? [
                    {
                      _attr: {
                        role: "author",
                        scheme: "urn:ebu",
                      },
                    },
                    node.cover.credits.text,
                  ]
                : null,
            },
          ],
        })
      }

      return element
    }),
  setup: options => {
    return {
      ...options,
      feed_url: new URL(`/feed/${locale}_blog.xml`, siteUrl).href,
      site_url: new URL("/blog", siteUrl).href,
      image_url: new URL("/share.jpg", siteUrl).href,
      custom_elements: [
        { language: locale },
        { "dc:language": locale },
        { "dc:creator": process.env.AUTHOR },
      ],
      custom_namespaces: {
        media: "http://search.yahoo.com/mrss/",
      },
    }
  },
  query: `
    {
      allGraphCmsArticle(filter: { stage: { eq: PUBLISHED }, locale: { eq: ${locale} } }) {
        nodes {
          content {
            html
          }
          title
          slug
          published
          excerpt
          authors {
            firstName
            lastName
            email
          }
          categories {
            name
          }
          cover {
            localFile {
              publicURL
              size
            }
            credits {
              text
            }
            fileName
            width
            height
            mimeType
          }
        }
      }
    }
  `,
  output: `/feed/${locale}_blog.xml`,
  title: process.env.TITLE,
  description: process.env.AUTHOR,
})
