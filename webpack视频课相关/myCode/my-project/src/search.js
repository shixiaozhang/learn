import React from 'react'
import ReactDom from 'react-dom'
import './search.css'
import './search_B.less'
class Search extends React.Component {
    render() {
        return <div> Seach-react <p>12312212</p></div>
    }
}
ReactDom.render(
    <Search></Search>,
    document.getElementById("root")
)