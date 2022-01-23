import React from 'react'
import { createUI } from 'tanfu-react'

export interface BProps {
    onClick?: () => void
}
const B = createUI(function ({ onClick }: BProps) {
    return <div onClick={onClick}>B组件 点击</div>
})

export default B;