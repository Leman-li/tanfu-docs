---
title: Tanfu 进阶
order: 2
toc: menu
nav:
  title: 指南
  order: 1
---


## 如何进行扩展开发（定制化开发）

### 扩展逻辑
对逻辑的扩展很简单，如下所示，我们调用容器组件的 extend 方法传入扩展后的 Controller 即可

```js
class NewAppController extends AppController {
     // 模拟新的业务逻辑
     increase(): number {
        return (this.engine?.getState('elementA').count ?? 0) + 2
    }
}

// 通过容器组件的extend方法消费新的 Controller
// 此处注意 NewApp 并不会消费老的 AppController， 
// 因为 NewAppController 和 AppController 有共同的 name，后加入的 Controller 会将前面的 Controller 覆盖
const NewApp = App.extend({controllers: [new NewAppController()]})
```

<br/>

<code src="../../src/demo/NewApp.tsx"></code>

### 扩展视图

对视图的扩展也很简单，如下所示，我们调用容器组件的 extend 方法传入扩展后的视图即可

```js
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
```
<br/>
<code src="../../src/demo/NewApp1.tsx"></code>

### 使用全局视图扩展

全局组件设置之后可以对工程里对应 elementId 的所有组件进行替换

```js
import React from 'react'
import Tanfu, { Template } from 'tanfu-react'

Tanfu.element('globalElement', function () {
    return <div>全局注册组件</div>
})

const Child = function () {
    return (
        <div>
            {/** 如果没有 globalElement1 则默认显示 children */}
            <Template elementId='globalElement1'>这是globalElement1</Template>
            <Template elementId='globalElement' />
        </div>
    )
}

const App = function () {
    return (
        <div>
            <Template elementId='globalElement' />
            <Child/>
        </div>
    )
}

export default App

```
<br/>

<code src="../../src/demo/GlobalNewApp.tsx"></code>

## 插件开发

插件是自包含的代码，通常向 Tanfu 添加全局级功能。它可以是公开 install() 方法的 object，也可以是 function

插件的功能范围没有严格的限制 —— 一般有下面几种：

1. 添加全局的 UI 组件

2. 向 Controller 添加全局的方法或 property

3. ... 后续将开发更多的插件功能

### 编写插件
 
为了更好地理解如何创建自己的 Tanfu.js 版插件，我们将创建一个非常简化的插件版本，它向 Controller 里添加一个通用的转换函数

```js
export default {
    install: (tanfu)=>{
        tanfu.setPrototypeOfController('arrayToTree',function(arr){
            .....
        })
    }
}

```


### 使用插件

在根视图渲染前，你可以通过调用 use() 方法将插件添加到你的应用程序中。

```js
import Tanfu from 'tanfu-react'
import arrayToTreePlugin from './plugins/arrayToTree'

Tanfu.use(arrayToTreePlugin)

```

此后你就可以在 Controller 中直接使用 arrayToTree 方法了

```js
import { Controller } from 'tanfu-react'

class AController extends Controller{
    someBusiness(){
        ...
        this.arrayToTree()
        ...
    }
}

```