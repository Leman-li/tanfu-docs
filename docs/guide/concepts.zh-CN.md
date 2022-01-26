---
title: Tanfu 概念
order: 3
toc: menu
nav:
  title: 指南
  order: 1
---


## UI 组件

ui组件有以下特性:

1. 只负责ui的的渲染
2. 不包含任何的状态
3. 页面的渲染全由组件的 props 决定

如

```js
import { createUI } from 'tanfu-react'
const PeerUI = creatUI(function({value}){
  return <div>{value}</div>
})
```

## 容器组件

1. 不负责UI的呈现，或者说是由 UI 组件组合而成
2. 管理业务数据和业务逻辑 (通过 Controller 来管理数据和逻辑 )

如：

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

## 控制器

控制器主要用来将视图和逻辑进行解耦，用于容器组件的业务数据和业务逻辑的处理

## 插件

插件主要用向框架添加全局及功能，详细介绍见 [插件开发](./tanfu-advanced#插件开发)