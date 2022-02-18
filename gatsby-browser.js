import React from "react"

import PageLayout from "./src/layouts/page-layout"

import "./src/scss/style.scss"

export function wrapPageElement({ element, props }) {
  return <PageLayout {...props}>{element}</PageLayout>
}

export function onServiceWorkerUpdateReady() {
  window.location.reload(true)
}
