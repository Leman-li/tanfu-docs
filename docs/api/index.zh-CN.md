---
title: API
order: 1
toc: menu
nav:
  title: API
  order: 2
---

## 基本 API

### createUI(view)
该方法用来创建 [UI](../zh-CN/guide/concepts) 组件

如：

```js
import { createUI } from 'tanfu-react'
export default createUI(function(){
    return <div>ui</div>
})
```

### createContainer(view)
该方法用来创建 [容器](../zh-CN/guide/concepts) 组件, 容器组件可以消费 Controller

```js
import { createContainer, Template, Controller } from 'tanfu-react'

class SpecialController extends Controller{
    apply(engine){
        ....
    }
}

export default createContainer(function(){
    return <div>
       <Template elementId="element1"/>
    </div>
},[new SpecialController()])
```

## Tanfu

### use(plugin)

该方法用来加载 Tanfu 插件，详情见 [Tanfu 插件开发](../zh-CN/guide/tanfu-advanced#插件开发)

### element(elementId,view)

该方法用来定义全局组件

如

```js
import React from 'react'
import Tanfu, { createContainer, Template } from 'tanfu-react'
Tanfu.element('element1',function(){
    return <div>全局视图</div>
})

export default createContainer(function(){
    return <div>
       <Template elementId="element1"/>
    </div>
})
```
<br/>

```jsx
import React from 'react'
import Tanfu, { createContainer, Template } from 'tanfu-react'
Tanfu.element('element1',function(){
    return <div>全局视图</div>
})

export default createContainer(function(){
    return <div>
       <Template elementId="element1"/>
    </div>
})
```

### setPrototypeOfController(name, value)

该方法用来设置 Controller 的原型

## Controller

### getName()

该方法为 Controller 定义唯一的名称 (也可不重写)，当两个具有相同名称 Controller 进行加载时
后者会覆盖前者, 当需要对业务逻辑进行扩展（定制化开发时）特别有用

```js
class SpecialController extends Controller{
    getName(){
        return 'SpecialController'
    }
}
```

### apply(engine, controller)

该方法为 Controller 加载时调用的入口，在定义 Controller 必须被重写

```js
class SpecialController extends Controller{
   
   apply(engine){
       engine.setState({
           elementx:{
               value: 'x'
           }
       })
   }
}
```

## Engine

### setState(states: Record<ElementId,ElementProps>)

该方法为设置某个视图的状态值

如

```js
   engine.setState({
       element1:{
           value: 1
       },
       element2:{
           value: 2
       }
   })
```

### getState(elementId)

该方法为获取某个视图的状态值

如
```js
   const { value } = engine.getState('element1')

```

### injectCallback(elementId,callbackName, callbackBody)

该方法是对某个视图注入回调函数

如
```js
  engine.injectCallback('button1', 'onClick', ()=>{
      engine.setState({
          element1:{
              value: 5
          }
      })
  })
```

### watchElement(elementId, watchFn, deps)

该方法监听某个视图的状态变化

```js
  engine.watchElement('element1',()=>{

  },['value'])
```

### willUnmount(elementId, fn)

该方法为某个视图将卸载时触发

如
```js
   engine.willUnmount('element1',()=>{

   })
```

### didMount(elementId, fn)

该方法为某个视图加载时触发

如
```js

    engine.didMount('element1',()=>{
        
    })
```