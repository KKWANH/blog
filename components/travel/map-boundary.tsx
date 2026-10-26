'use client'

import { Component, Fragment, type ReactNode } from 'react'

export class MapBoundary extends Component<{ children: ReactNode }, { failed: boolean; attempt: number }> {
  state = { failed: false, attempt: 0 }

  static getDerivedStateFromError() { return { failed: true } }

  render() {
    if (this.state.failed) {
      return (
        <div className="atlas-map-loading">
          <div className="map-recovery" role="status">
            <p>The map couldn&apos;t open.</p>
            <p>You can still use the place index and editing controls.</p>
            <button type="button" className="action-button" onClick={() => this.setState((state) => ({ failed: false, attempt: state.attempt + 1 }))}>Try the map again</button>
          </div>
        </div>
      )
    }
    return <Fragment key={this.state.attempt}>{this.props.children}</Fragment>
  }
}
