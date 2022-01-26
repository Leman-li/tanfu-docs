import App, { AppController } from "./App";

class NewAppController extends AppController{
     // 重写业务逻辑
     increase(): number {
        return (this.engine?.getState('elementA').count ?? 0) + 2
    }
}

const NewApp = App.extend({
    controllers:[new NewAppController()]
})

export default NewApp