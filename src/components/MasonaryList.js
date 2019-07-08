import React from "react"
import { Masonry } from "react-masonry-responsive"
import isEqual from "lodash/isEqual"
export class MasonaryList extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    const nextKeys = nextProps.data.map(i => i.key)
    const keys = this.props.data.map(i => i.key)

    return (
      isEqual(keys, nextKeys) ||
      nextProps.lg !== this.props.lg ||
      this.props.currentPaginationPage !== nextProps.currentPaginationPage ||
      this.props.selectedFilter !== nextProps.selectedFilter ||
      this.props.windowWidth !== nextProps.windowWidth
    )
  }
  render() {
    return (
      <div id="list">
        <div>
          <Masonry
            gap={20}
            items={this.props.data.slice(
              this.props.currentPaginationPage,
              this.props.currentPaginationPage + this.props.articlesPerPage
            )}
            minColumnWidth={this.props.lg ? 200 : 245}
          />
        </div>
      </div>
    )
  }
}
