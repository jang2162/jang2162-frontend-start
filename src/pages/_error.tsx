import * as React from 'react'

export default class extends React.Component<{statusCode?: number, message?: string}> {
    render() {
        return (
            <div>
                ERROR <br/>
                {this.props.statusCode || ''} <br/>
                {this.props.message || ''}
            </div>
        )
    }
}