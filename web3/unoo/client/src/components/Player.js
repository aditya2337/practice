import React from 'react';

const count = arr => {
  const counts = {};
  arr.forEach(x => {
    counts[x] = (counts[x] || 0) + 1;
  });
  return counts;
};

const getMaxColor = colors => {
  let max = 0;
  let maxColor = '';
  Object.keys(colors).map(color => {
    if (colors[color] > max) {
      max = colors[color];
      maxColor = color;
    }
    return color;
  });

  return maxColor;
};

const returnCard = (card, func, maxColor, player) => {
  let arr = [];
  if (card.isWildCard()) {
    arr = [maxColor, card.value.toString()];
  } else {
    arr = [card.color.toString(), card.value.toString()];
  }
  const returnedCard = func(arr, player);
  return returnedCard;
};

const Player = ({ player, disabled, playCard, getCard }) => {
  const colors = [];
  player.hand.map(
    card => !card.isWildCard() && colors.push(card.color.toString())
  );
  const maxColor = getMaxColor(count(colors));
  return (
    <div>
      {player.name}
      <div>
        {player.hand.map((card, index) => (
          <div key={index} className="ba pa2">
            {card.value.toString()} :{' '}
            {!card.isWildCard() && card.color.toString()}
            <button
              onClick={() =>
                playCard(returnCard(card, getCard, maxColor, player))
              }
              disabled={disabled}
              className="ml3">
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
