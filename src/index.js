import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let num_blox = 0;

class Blox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.id = num_blox;
    this.state.color = this.props.color
    num_blox++;
    this.state.style = {
      width : this.props.width + 'vw',
      height : (this.props.height) + 'vh',
      backgroundColor : this.state.color,
      color : this.state.color
    }
  }

  handle_mouse_leave() {
    document.getElementById(this.state.id).style.backgroundColor = this.state.style.backgroundColor
    document.getElementById(this.state.id).style.width =  this.state.style.width

  }

  handle_mouse_enter() {
    document.getElementById(this.state.id).style.width = this.props.height + 'vh'
    document.getElementById(this.state.id).style.backgroundColor = 'white'
  }

  render() {
    return (
      <div
        id={this.state.id}
        class="blox"
        style={this.state.style}
        onMouseEnter={() => {
          this.handle_mouse_enter()
        }}
        onMouseLeave={() => {
          this.handle_mouse_leave()
        }}
        >
        <h1>{this.props.data.title}</h1>
      </div>
    )
  }
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'row_width' : 70,
      'row_height' : 50,
      'num_blox' : this.props.data.length
    }
    this.state.block_height = this.state.row_height
    this.state.block_width =  this.state.row_width / this.state.num_blox
    this.state.block_width_percentage = (this.state.num_blox/100)*100
    this.state.style =  {
      height:this.state.row_height+'vh',
      width:this.state.row_width+'vw'
    }
    this.color_arr = this.props.data.slice().map((e) => e.color)
  }
  render_blox (data) {
    let arr_of_blox = []
    for (let e in data) {
      arr_of_blox.push(<Blox data={data[e]} width={this.state.block_width} height={this.state.block_height} color={this.color_arr.shift()} />);
    }
    return arr_of_blox
  }
  render() {
    return (
      <div class="row" style={this.state.style}>{this.render_blox(this.props.data)}</div>
    )
  }
}

ReactDOM.render(<Row data={
      [
        {'color' : '#212121', 'title' : '0000'},
        {'color' : '#313131', 'title' : '0001'},
        {'color' : '#414141', 'title' : '0010'},
        {'color' : '#515151', 'title' : '0011'},
        {'color' : '#616161', 'title' : '0100'},
        {'color' : '#717171', 'title' : '0101'},
        {'color' : '#818181', 'title' : '0110'},
        {'color' : '#919191', 'title' : '0111'},
        {'color' : '#a1a1a1', 'title' : '1000'},
      ]
    }/>, document.getElementById("root"))
