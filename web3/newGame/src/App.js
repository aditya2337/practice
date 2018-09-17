import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import RoomContract from '../build/contracts/Room.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const contract = require('truffle-contract');
const simpleStorage = contract(RoomContract);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      instance: null,
      account: null
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
        simpleStorage.setProvider(results.web3.currentProvider);
        results.web3.eth.getAccounts((err, accounts) => {
          this.setState({ account: accounts[0] });
          simpleStorage
            .deployed()
            .then(instance => {
              this.setState({ instance });

              this.instantiateContract();
            })
            .catch(e => console.warn(e));
        });

        // Instantiate contract once web3 provided.
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  instantiateContract() {
    const { instance } = this.state;
    instance.getCreatedTables().then(res => {
      console.log(res);
      this.setState({ storageValue: res.length });
    });
  }

  addTable = () => {
    const { instance, account, web3 } = this.state;
    instance.createTable
      .call(100, { value: 100, from: account })
      .then(res => {
        this.instantiateContract();
      })
      .catch(e => console.error(e, account));
  };

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Uno created using truffle</h1>
              <p>
                Total number of created tables in this room are{' '}
                {this.state.storageValue}
              </p>
            </div>
            <div className="mt4">
              <Button
                onClick={() => this.addTable()}
                icon
                labelPosition="right">
                Create Table
                <Icon name="right arrow" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
