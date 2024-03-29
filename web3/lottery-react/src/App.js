import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success..' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.fromWei(this.state.balance, 'ether')
    });

    this.setState({ message: 'You have been entered' });
  };

  handleClick = async e => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success..' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div>
        <h2>Lottery contract</h2>
        <p>
          This contract is managed by {this.state.manager}. There are currently{' '}
          {this.state.players.length} people entered, competing to win{' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.handleSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
            <button>Enter</button>
          </div>
        </form>

        <hr />

        <h1>{this.state.message}</h1>

        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.handleClick}>Pick a winner!</button>

        <hr />
      </div>
    );
  }
}

export default App;
