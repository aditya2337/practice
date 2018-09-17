import React, { Component } from 'react';
import { Game, Card, Values, Colors } from 'uno-engine';
import Player from './components/Player';

const players = ['Player 1', 'Player 2', 'Player 3'];

class App extends Component {
  state = {
    game: Game(players),
    currentPlayer: null,
    discardedCard: null
  };

  componentDidMount() {
    const { game } = this.state;
    this.setState({
      currentPlayer: game.currentPlayer,
      discardedCard: game.discardedCard
    });
    game.play();
  }

  playCard = card => {
    const { game } = this.state;
    try {
      game.play(card);
      this.setState({
        currentPlayer: game.currentPlayer,
        discardedCard: game.discardedCard
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCard = ([color, value], player) => {
    let card = Card(Values.get(value), Colors.get(color));
    if (value === 'WILD' || value === 'WILD_DRAW_FOUR') {
      card = player.getCardByValue(Values.get(value));
      card.color = Colors.get(color);
    }
    return card;
  };

  render() {
    let { game, currentPlayer, discardedCard } = this.state;
    discardedCard = discardedCard && discardedCard.toString();
    return (
      <div>
        <div className="flex w-100 justify-between">
          {players.map((player, index) => (
            <div
              className={`ba ${
                currentPlayer && currentPlayer.name === player
                  ? 'bg-light-yellow'
                  : ''
              }`}
              key={index}>
              <Player
                getCard={this.getCard}
                playCard={this.playCard}
                disabled={currentPlayer && currentPlayer.name !== player}
                player={game.getPlayer(player)}
              />
            </div>
          ))}
        </div>
        <div className="mt5 tc flex flex-column items-center">
          <label>Current Card</label>
          <div className="ba mw5 pa2">{discardedCard}</div>
        </div>
        <div className="tc flex flex-column items-center">
          <button
            className="mt5"
            onClick={() => {
              game.draw();
              this.setState({
                currentPlayer: game.currentPlayer,
                discardedCard: game.discardedCard
              });
            }}>
            Draw cards
          </button>
          <button
            className="mt5"
            onClick={() => {
              try {
                game.pass(); // current player pass after drawing
              } catch (e) {
                console.log(e);
              }
              this.setState({
                currentPlayer: game.currentPlayer,
                discardedCard: game.discardedCard
              });
            }}>
            Pass
          </button>
        </div>
      </div>
    );
  }
}

export default App;
