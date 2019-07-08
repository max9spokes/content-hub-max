import React, { Component } from "react"

export default class ShouldIframeUpdate extends Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.tool.tool.localZipFolder !==
        this.props.tool.tool.localZipFolder ||
      nextProps.tool.tool.localZipHtmlSrc !==
        this.props.tool.tool.localZipHtmlSrc
    )
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}
