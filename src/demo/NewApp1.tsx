import React from 'react'
import { createUI } from 'tanfu-react'
import App from './App'
import { BProps } from './B'
const NewB = function ({ onClick }: BProps) {
    return <div onClick={onClick}>PRESS NEW B</div>
}

const NewApp = App.extend({
    elements: {
        'elementB': NewB
    }
})

export default NewApp