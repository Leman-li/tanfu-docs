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
