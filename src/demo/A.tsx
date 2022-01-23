import React from 'react'
import { createUI } from 'tanfu-react'

export interface AProps {
    count?: number
}
const A = createUI(function ({ count }: AProps) {
    return <div>A组件{count}</div>
})

export default A;