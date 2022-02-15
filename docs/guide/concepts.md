---
title: Tanfu concepts
order: 3
toc: menu
nav:
  title: guide
  order: 1
---


## the UI components

UI components have the following features:

1. Only responsible for UI rendering
2. Does not contain any state
3. The rendering of the page is entirely determined by the props of the component


```js
import { createUI } from 'tanfu-react'
const PeerUI = creatUI(function({value}){
  return <div>{value}</div>
})
```

## Container components

1. Not responsible for the presentation of the UI, or the combination of UI components
2. Manage business data and business logic (manage data and logic through Controller)


```js
import { createContainer } from 'tanfu-react'

class SelfController extends Controller {
  apply(engine){
    .... fetch ...
    ...
    engine.setState({
      peer1:{
        value: 1
      },
      peer2:{
        value: 2
      }
    })
  }
}


const Container = createContainer(function(){
  return (
    <div>
      <PeerUI elementId="peer1"/>
      <PeerUI elementId="peer2"/>
    </div>
  )
})

```

## controller

A controller is used to decouple views from logic and process service data and logic of container components

## plug-in
Plugins are mainly used to add global and functionality to the framework. For more details, see [Plugin Development](./tanfu-advanced#plug-in-development).