import React from "react"
import classNames from "classnames"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share"

import "../scss/components/_social-sharing.scss"

export default function SocialSharing({ title, location }) {
  return (
    <div className="social-sharing">
      <FacebookShareButton url={location.href} className="share-button">
        <span className="icon">
          <i className={classNames("fab", "fa-facebook")} />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        url={location.href}
        className="share-button"
        title={title}
      >
        <span className="icon">
          <i className={classNames("fab", "fa-twitter")} />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton url={location.href} className="share-button">
        <span className="icon">
          <i className={classNames("fab", "fa-linkedin")} />
        </span>
      </LinkedinShareButton>
      <WhatsappShareButton
        url={location.href}
        className="share-button"
        title={title}
      >
        <span className="icon">
          <i className={classNames("fab", "fa-whatsapp")} />
        </span>
      </WhatsappShareButton>
      <TelegramShareButton
        url={location.href}
        className="share-button"
        title={title}
      >
        <span className="icon">
          <i className={classNames("fab", "fa-telegram")} />
        </span>
      </TelegramShareButton>
    </div>
  )
}
