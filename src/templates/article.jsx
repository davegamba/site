import React from "react"
import classNames from "classnames"
import { graphql, Link } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { Seo } from "@pittica/gatsby-plugin-seo"

import SocialSharing from "../components/social-sharing"
import ArticleNavigation from "../components/ui/article-navigation"
import Icon from "../components/ui/icon"

import "../scss/templates/_article.scss"
import ArticleAuthors from "../components/ui/article-authors"

export default function Article({
  data: {
    post: {
      title,
      cover,
      content,
      categories,
      authors,
      published,
      formattedDate,
      description,
      readingTime: { minutes },
    },
    next,
    previous,
  },
  location,
}) {
  const image =
    cover && cover.localFile
      ? getImage(cover.localFile.childImageSharp).images.fallback.src
      : null

  return (
    <article className="article">
      <Seo
        location={location}
        title={title}
        description={description}
        image={image}
        isBlogPost={true}
        author={
          authors && authors.length > 0
            ? `${authors[0].firstName} ${authors[0].lastName}`
            : null
        }
      />
      <header>
        <section
          className={classNames("hero", "is-halfheight")}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="hero-body">
            <div className="has-text-centered">
              <h1 className="title">{title}</h1>
              <div className="meta">
                <Icon icon="clock">
                  <time dateTime={published}>{formattedDate}</time>
                </Icon>
              </div>
            </div>
          </div>
          {categories && categories.length > 0 && (
            <div className="hero-foot">
              <nav className={classNames("tabs", "is-boxed")}>
                <div className="container">
                  <ul>
                    {categories.map(category => (
                      <li key={`category-${category.id}`}>
                        <Link
                          to={`/categories/${category.slug}`}
                          title={category.name}
                        >
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </section>
      </header>
      {content.html && content.html && (
        <div className="container">
          {minutes && (
            <div className="reading-time">
              Tempo di lettura: <span>{Math.round(minutes)}</span> minuti
            </div>
          )}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content.html }}
          ></div>
        </div>
      )}
      <ArticleNavigation next={next} previous={previous} />
      <ArticleAuthors nodes={authors} />
      <SocialSharing location={location} title={title} />
    </article>
  )
}

export const pageQuery = graphql`
  query BlogTemplate(
    $id: String!
    $locale: GraphCMS_Locale
    $stage: GraphCMS_Stage
    $next: String
    $previous: String
  ) {
    post: graphCmsArticle(
      stage: { eq: $stage }
      id: { eq: $id }
      locale: { eq: $locale }
    ) {
      id
      slug
      title
      description: excerpt
      published
      formattedDate
      content {
        html
      }
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1920, height: 1280, placeholder: BLURRED)
          }
        }
      }
      keywords
      categories {
        id
        name
        slug
      }
      tags {
        id
        name
        slug
      }
      authors {
        id
        slug
        firstName
        lastName
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 96, height: 96, placeholder: BLURRED)
            }
          }
        }
      }
      readingTime {
        minutes
      }
    }
    next: graphCmsArticle(
      stage: { eq: $stage }
      locale: { eq: $locale }
      id: { eq: $next }
    ) {
      slug
      title
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 800, height: 800, placeholder: BLURRED)
          }
        }
      }
    }
    previous: graphCmsArticle(
      stage: { eq: $stage }
      locale: { eq: $locale }
      id: { eq: $previous }
    ) {
      slug
      title
      cover {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 800, height: 800, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
