---
title: Getting started
order: 2
toc: menu
nav:
  title: guide
  order: 1
---


## Install the Tanfu

Install tanfu-react using NPM or YARN

```bash
npm install tanfu-react --save

```

or

```bash
yarn add tanfu-react
```

## Create UI Components

Create UI component A

```js
 import React from 'react'
import { createUI } from 'tanfu-react'

export interface AProps {
    count?: number
}
const A = createUI(function ({ count }: AProps) {
    return <div>A组件{count}</div>
})

export default A;
```
<br/>

<code src="../../src/demo/A.tsx"></code>

Create UI component B

```js
 import React from 'react'
import { createUI } from 'tanfu-react'

export interface BProps {
    onClick?: () => void
}
const B = createUI(function ({ onClick }: BProps) {
    return <div onClick={onClick}>B组件 点击</div>
})

export default B;
```

<br/>

<code src="../../src/demo/B.tsx"></code>

## Create container components and controllers

```js

 import React from 'react'
import { Controller, createContainer, Engine } from 'tanfu-react'
import A, { AProps } from './A'
import B, { BProps } from './B'

type ViewModel = {
    elementA: AProps,
    elementB: BProps
}

export class AppController extends Controller<ViewModel> {

    // You don't need to rewrite it here, but you must if you want to extend the Controller
    getName(): string | void {
        return 'AppController'
    }

    // Pull out the business logic here
    increase(): number {
        return (this.engine?.getState('elementA').count ?? 0) + 1
    }

    apply(engine: Engine<ViewModel>) {
        engine.didMount('elementA', () => {
            engine.setState({
                elementA: {
                    count: 0
                }
            })
        })

        engine.injectCallback('elementB', 'onClick', () => {
            engine.setState({
                elementA: {
                    count: this.increase()
                }
            })
        })
    }
}

const App = createContainer(function () {
    return (
        <div>
            <A elementId='elementA' />
            <B elementId='elementB' />
        </div>
    )
}, [new SelfController()])

export default App

```
<br/>

<code src="../../src/demo/App.tsx"></code>

You have now separated the view and business logic of the container component C