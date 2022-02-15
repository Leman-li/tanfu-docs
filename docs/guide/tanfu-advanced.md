---
title: Tanfu advanced
order: 2
toc: menu
nav:
  title: guide
  order: 1
---


## How to extend development (Custom development)

### extend logic
Extending the logic is simple, as shown below, by calling the extend method of the container component to pass in the extended Controller

```js
class NewAppController extends AppController {
     // Simulate new business logic
     increase(): number {
        return (this.engine?.getState('elementA').count ?? 0) + 2
    }
}

// Consume new controllers through the container component's extend method
// Note here that NewApp does not consume the old AppController,
// Because NewAppController and AppController have the same name, the later Controller overwrites the previous Controller
const NewApp = App.extend({controllers: [new NewAppController()]})
```

<br/>

<code src="../../src/demo/NewApp.tsx"></code>

### extend view

Extending the view is also simple, as shown below, by calling the extend method of the container component to pass in the extended view

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

### Use global view extension

After setting the global component, you can replace all components corresponding to elementId in the project

```js
import React from 'react'
import Tanfu, { Template } from 'tanfu-react'

Tanfu.element('globalElement', function () {
    return <div>Global Registry component</div>
})

const Child = function () {
    return (
        <div>
            {/** If there is no globalElement1, children is displayed by default */}
            <Template elementId='globalElement1'>This is globalElement1</Template>
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

## Plug-in development

Plug-ins are self-contained code that typically adds global-level functionality to Tanfu. It can be either an object that exposes the install() method or a function
There are no hard and fast limits to what a plug-in can do -- there are usually:
1. Add global UI components
2. Add global methods or properties to the Controller
3. ... More plug-in features will be developed later

### Write plug-ins
 
To better understand how to create your own tanfu.js version of the plug-in, we will create a very simplified version of the plug-in that adds a generic conversion function to the Controller

```js
export default {
    install: (tanfu)=>{
        tanfu.setPrototypeOfController('arrayToTree',function(arr){
            .....
        })
    }
}

```


### Use 

Before the root view is rendered, you can add plug-ins to your application by calling the use() method.

```js
import Tanfu from 'tanfu-react'
import arrayToTreePlugin from './plugins/arrayToTree'

Tanfu.use(arrayToTreePlugin)

```

Then you can use the arrayToTree method directly in the Controller

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