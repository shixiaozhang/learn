import Server from 'react-dom/server'

let Greet = () => <h1>Hello ,Esbuild</h1>

console.log(Server.renderToString(<Greet></Greet>))

import { PATH } from 'env'
console.log(`PATH is ${PATH}`)
