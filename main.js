import { createElement, Component, render } from './toy-react'

class MyCompoment extends Component {
  render() {
    return (<div>
      <h1>MyCompoment</h1>
      {this.children}
    </div>)
  }
}

render(<MyCompoment id="a" class="c"> dasdsad
  <div>abc</div>
  <div>123</div>dasdas
  <div>zhq</div>
</MyCompoment>, document.body)