import * as React from 'react'

export default function errPage(props: {statusCode?: number, message?: string}) {
    return (
        <div>
            ERROR <br/>
            {props.statusCode || ''} <br/>
            {props.message || ''}
        </div>
    )
}