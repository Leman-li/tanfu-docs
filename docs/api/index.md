---
title: API
order: 1
toc: menu
nav:
  title: API
  order: 2
---

## Basic API

### createUI(view)
This method is used to create [UI](../guide/concepts) components



```js
import { createUI } from 'tanfu-react'
export default createUI(function(){
    return <div>ui</div>
})
```

### createContainer(view)

This method is used to create [container](../guide/concepts) components, container components can consume controllers

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

This method is used to load the Tanfu plug-in, as described in [Tanfu Plug-in Development](../guide/ Tanfu-advanced)

### element(elementId,view)

This method is used to define global components


```js
import React from 'react'
import Tanfu, { createContainer, Template } from 'tanfu-react'
Tanfu.element('element1',function(){
    return <div>A global view</div>
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
    return <div>A global view</div>
})

export default createContainer(function(){
    return <div>
       <Template elementId="element1"/>
    </div>
})
```

### setPrototypeOfController(name, value)

This method is used to set the Controller prototype

## Controller

### getName()
This method defines a unique name (and may not be overridden) for the Controller when two controllers with the same name are loaded
The latter overrides the former and is particularly useful when business logic needs to be extended (custom development)

```js
class SpecialController extends Controller{
    getName(){
        return 'SpecialController'
    }
}
```

### apply(engine, controller)

This method is the entry to be called when the Controller loads and must be overridden when defining the Controller

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

This method sets the state value of a view


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

This method is used to get the state value of a view


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

This method listens for state changes in a view

```js
  engine.watchElement('element1',()=>{

  },['value'])
```

### willUnmount(elementId, fn)

This method is triggered when a view will be unmounted


```js
   engine.willUnmount('element1',()=>{

   })
```

### didMount(elementId, fn)

This method is triggered when a view is loaded


```js

    engine.didMount('element1',()=>{
        
    })
```