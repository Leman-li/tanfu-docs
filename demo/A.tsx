import React from 'react'
import { createUI } from 'tanfu-react'

interface AProps {
    text: string
}
const A = createUI(function ({ text }: AProps) {
    return <div>A组件{text}</div>
})

export default A;