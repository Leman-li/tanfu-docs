import React from 'react'
import { Controller, createContainer, Engine } from 'tanfu-react'
import A, { AProps } from './A'
import B, { BProps } from './B'

type ViewModel = {
    elementA: AProps,
    elementB: BProps
}

export class SelfController extends Controller<ViewModel> {

    // 此处可以不用重写
    getName(): string | void {
        return 'selfController'
    }

    // 此处抽离出业务逻辑
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

const C = createContainer(function () {
    return (
        <div>
            <A elementId='elementA' />
            <B elementId='elementB' />
        </div>
    )
}, [new SelfController()])

export default C