import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    score: 0,
  }


  onSubmit = (event) => {
    event.preventDefault();
    const game = JSON.parse(event.target.children[0].value);
    if (this.validInput(game) === false) {
      return;
    }

    this.setState({
      score: this.scoreGenerator(game),
    });
  }

  validInput = (input) => {
    if (!Array.isArray(input) || input.length === 0 || input.length >= 10) {
      alert('please enter valid input')
      return false;
    }
  }
  
  getSum = (arr) => arr ? arr.reduce((a,b) => a + b, 0) : 0;

  scoreGenerator = (game) => {
    let score = 0;
    game.forEach((frame, index) => {
      if(frame.length > 2){
        return alert('Only valid frames will be scored')
      } else if (frame[0] === 10) {
        score += this.getSum(frame) + this.getSum(game[index + 1]) + this.getSum(game[index + 2]);
      } else if (this.getSum(frame) === 10) {
        score += this.getSum(frame) + this.getSum(game[index + 1]);
      } else {
        score += this.getSum(frame);
      }
    });

    return score;
  }
  
  render() { 

    return (
      <div className="App">
        <div style={styles.scoreHeader}>Your Score!</div>
        <div style={styles.score}>{this.state.score}</div>
        <div style={styles.rules}>Insert frame scores in the following format: [[1,2], [3,4], [5,6]]</div>
        <form onSubmit={this.onSubmit}>
          <input style={styles.input} id="score-json"></input>
          <button style={styles.button} type="submit">Submit Me!</button>
        </form>
      </div>
    );
  }
}

const styles = {
  scoreHeader: {
    color: '#4efcff',
    marginTop: 50,
    fontSize: 75,
  },
  score: {
    fontSize: 150,
    color: '#4efcff'
  },
  rules: {
    color: '#4efcff',
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    marginRight: 10,
    border: '2px solid #4efcff',
    fontSize: 15
  },
  button: {
    backgroundColor: '#4efcff',
    fontSize: 20,
    color: '#214c91',
    border: '1px solid #214c91'
  }
}

export default App;
