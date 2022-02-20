import { getImage } from "gatsby-plugin-image"

export default function getCover(post) {
  if (post) {
    return post.cover && post.cover.localFile
      ? getImage(post.cover.localFile.childImageSharp)
      : null
  } else {
    return null
  }
}
