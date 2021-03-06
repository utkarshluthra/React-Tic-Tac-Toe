import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button 
            className="square" 
            onClick={()=> this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
            xIsNext: true,
            firstPlayer: " ",
            secondPlayer: " ",
            win: false,
        }

        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
    }

    handleClick(i, winner){

        if(winner)
          this.setState({win: true});

        const squares = this.state.squares.slice();
        if (this.state.win || squares[i]){
            return;
        }

        if(winner){
          squares[i] = '';
        }
        else
          squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });  
    }

    handleChangeFirst(event) {
      this.setState({
        firstPlayer: event.target.value,
      });
    }

    handleChangeSecond(event) {
      this.setState({
        secondPlayer: event.target.value,
      });
    }

    renderSquare(i, winner) {
      return (
      <Square 
        value={this.state.win ? this.state.squares[i] : this.state.squares[i]} 
        onClick={()=>{this.handleClick(i, winner)}}
      />);
    }
  
    render() {
      const winner = calculateWinner(this.state.squares, this.state);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;

        } else {
          status = 'Next player: ' + (this.state.xIsNext ? this.state.firstPlayer : this.state.secondPlayer);
        }

  
      return (
        <div>
          <h1>Tic Tac Toe</h1>

          <div className="play">

            <div>
              <div className="status">{status}</div>
              <div className="board-row">
                {this.renderSquare(0, winner)}
                {this.renderSquare(1, winner)}
                {this.renderSquare(2, winner)}
              </div>
              <div className="board-row">
                {this.renderSquare(3, winner)}
                {this.renderSquare(4, winner)}
                {this.renderSquare(5, winner)}
              </div>
              <div className="board-row">
                {this.renderSquare(6, winner)}
                {this.renderSquare(7, winner)}
                {this.renderSquare(8, winner)}
              </div>
            </div>

            <div className="section-input">
              Choose names:
              <br />
              <input type="text" className="name" onChange={this.handleChangeFirst} name="firstPlayer" placeholder="First Player" />
              <br />
              <input type="text" className="name" onChange={this.handleChangeSecond} name="secondPlayer" placeholder="Second Player" />
            </div>

          </div>

          <h6>Created by Utkarsh Luthra</h6>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares, player) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if(squares[a] === 'X')
          return player.firstPlayer;
        else
          return player.secondPlayer;
      }
    }
    return null;
  }
