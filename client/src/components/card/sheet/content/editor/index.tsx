import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getActions } from 'store/entities/service'
import MarkdownEditor from 'for-editor'
// FIXME: integrate with editor
// import { darcula as theme } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = {
    source: string;
}

// based on https://github.com/kkfor/for-editor
const ContentEditor = ({ source }: Props) => {
    const [value, setValue] = useState(source)
    const dispatch = useDispatch()

    const onChange = (nextContent: string) => {
        console.log(':::', [nextContent])
        // const { name, value } = e.target
        setValue(nextContent)
    }
    
    const _onSave = (nextContent: string) => {
        console.log([nextContent])
        const { updateDTODetails } = getActions('cards')
        dispatch(updateDTODetails({ content: nextContent }))
        // dispatch(updateEntity('cards'))
        // onSave()
    }

    return (
        <MarkdownEditor
            language="en"
            value={value}
            onChange={onChange}
            onSave={_onSave}
        />
    )
}

export default ContentEditor