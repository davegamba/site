require("dotenv").config()

const path = require("path")
const moment = require("moment")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

const siteUrl = process.env.URL || `https://${process.env.HOST}`

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const {
    data: { pages, articles, categories, tags, authors },
  } = await graphql(`
    query {
      pages: allGraphCmsPage(filter: { stage: { eq: PUBLISHED } }) {
        posts: group(field: locale) {
          nodes {
            id
            slug
          }
          fieldValue
        }
      }
      articles: allGraphCmsArticle(
        sort: { fields: createdAt, order: DESC }
        filter: { stage: { eq: PUBLISHED } }
      ) {
        posts: group(field: locale) {
          edges {
            node {
              id
              slug
              updatedAt
              locale
              stage
            }
            next {
              id
            }
            previous {
              id
            }
          }
          fieldValue
          totalCount
        }
      }
      categories: allGraphCmsCategory(filter: { stage: { eq: PUBLISHED } }) {
        posts: group(field: locale) {
          nodes {
            id
            slug
            stage
          }
          fieldValue
          totalCount
        }
      }
      tags: allGraphCmsTag(filter: { stage: { eq: PUBLISHED } }) {
        posts: group(field: locale) {
          nodes {
            id
            slug
            stage
          }
          fieldValue
          totalCount
        }
      }
      authors: allGraphCmsAuthor(filter: { stage: { eq: PUBLISHED } }) {
        posts: group(field: locale) {
          nodes {
            id
            slug
          }
          fieldValue
          totalCount
        }
      }
    }
  `)

  const listify = (totalCount, locale, group, template, params) => {
    const limit = parseInt(process.env.POSTS_PER_PAGE || 18)
    const length = Math.ceil(totalCount / limit)

    Array.from({ length }).forEach((_, i) =>
      createPage({
        path: i === 0 ? `/${group}` : `/${group}/${i + 1}`,
        component: path.resolve(`./src/templates/${template}.jsx`),
        context: {
          limit,
          skip: i * limit,
          pages: length,
          current: i + 1,
          locale,
          ...params,
        },
      })
    )
  }

  pages.posts.forEach(({ nodes, fieldValue }) =>
    nodes.forEach(({ id, slug }) =>
      createPage({
        path: `/${slug}`,
        component: path.resolve(`./src/templates/page.jsx`),
        context: {
          id,
          slug,
          locale: fieldValue,
        },
      })
    )
  )

  articles.posts.forEach(({ edges, totalCount, fieldValue }) => {
    edges.forEach(
      ({ node: { id, slug, updatedAt, locale, stage }, previous, next }) => {
        createPage({
          path: `/${slug}`,
          component: path.resolve(`./src/templates/article.jsx`),
          context: {
            id,
            slug,
            next: next ? next.id : null,
            previous: previous ? previous.id : null,
            updatedAt,
            locale,
            stage,
          },
        })
      }
    )

    listify(totalCount, fieldValue, "articles", "list")
  })

  categories.posts.forEach(({ nodes, fieldValue, totalCount }) =>
    nodes.forEach(({ id, slug, stage }) =>
      listify(totalCount, fieldValue, `categories/${slug}`, "category", {
        id,
        slug,
        stage,
      })
    )
  )

  tags.posts.forEach(({ nodes, fieldValue, totalCount }) =>
    nodes.forEach(({ id, slug, stage }) =>
      listify(totalCount, fieldValue, `tags/${slug}`, "tag", {
        id,
        slug,
        stage,
      })
    )
  )

  authors.posts.forEach(({ nodes, fieldValue, totalCount }) =>
    nodes.forEach(({ id, slug }) =>
      listify(totalCount, fieldValue, `authors/${slug}`, "author", {
        id,
        slug,
      })
    )
  )
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    GraphCMS_Article: {
      path: {
        type: "String!",
        resolve: ({ slug }) => `/${slug}`,
      },
      url: {
        type: "String!",
        resolve: ({ slug }) => new URL(`/${slug}`, siteUrl).href,
      },
      formattedDate: {
        type: "String",
        resolve: ({ published, locale }) => {
          const m = moment(new Date(published))
          m.locale(locale)

          return m.format("l")
        },
      },
    },
    GraphCMS_Page: {
      path: {
        type: "String!",
        resolve: ({ slug }) => `/${slug}`,
      },
      url: {
        type: "String!",
        resolve: ({ slug }) => new URL(`/${slug}`, siteUrl).href,
      },
    },
  })
}

exports.createSchemaCustomization = async ({ actions: { createTypes } }) => {
  createTypes(`
    type GraphCMS_Asset implements Node {
      localFile: File @link(from: "fields.localFile")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
  cache,
}) => {
  if (node.remoteTypeName == "Asset") {
    try {
      const ext = path.extname(node.fileName)
      const fileNode = await createRemoteFileNode({
        url: node.url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        getCache,
        name: path.basename(node.fileName, ext),
        ext,
      })

      if (fileNode) {
        createNodeField({
          node,
          name: "localFile",
          value: fileNode.id,
        })
      }
    } catch (e) {
      console.error("GraphCMS", e)
    }
  }
}
