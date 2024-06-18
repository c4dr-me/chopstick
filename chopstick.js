document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'player1';
    let selectedHand = null;
  
    const hands = {
      player1: { left: 1, right: 1 },
      player2: { left: 1, right: 1 }
    };
  
    window.selectHand = (player, hand) => {
      if (currentPlayer === player && hands[player][hand] <= 4) {
        if (selectedHand) {
          const previousSelectedHand = document.getElementById(`${selectedHand.player}-${selectedHand.hand}`);
          if (previousSelectedHand) {
            previousSelectedHand.classList.remove('selected');
          }
        }
        selectedHand = { player, hand };
        const currentSelectedHand = document.getElementById(`${player}-${hand}`);
        if (currentSelectedHand) {
          currentSelectedHand.classList.add('selected');
        }
      } else if (selectedHand && selectedHand.player !== player && hands[selectedHand.player][selectedHand.hand] <= 4) {
        attack(player, hand);
      }
    };
  
    const attack = (player, hand) => {
      const attacker = selectedHand;
      if (attacker && hands[attacker.player][attacker.hand] <= 4 && hands[player][hand] <= 4) {
        hands[player][hand] += hands[attacker.player][attacker.hand];
        if (hands[player][hand] > 4) hands[player][hand] = 0; // Make it a fist
  
        updateHandDisplay(player, hand);
        endTurn();
      }
    };
  
    const split = (player) => {
        if (currentPlayer === player) {
          const totalFingers = hands[player].left + hands[player].right;
      
          // Check if total fingers are even and greater than 4
          if (totalFingers % 2 !== 0 || totalFingers < 4) {
            alert('You can only split when the total number of fingers is even and greater than 4.');
            return; // Only split when total fingers are even and greater than 4
          }
      
         
            // Distribute fingers equally
            hands[player].left = totalFingers / 2;
            hands[player].right = totalFingers / 2;
      
            updateHandDisplay(player, 'left');
            updateHandDisplay(player, 'right');
          
        }
      
        endTurn();
      };
      
      
  
    const updateHandDisplay = (player, hand) => {
      const count = hands[player][hand];
      const handElement = document.getElementById(`${player}-${hand}`);
      if (handElement) {
        handElement.src = `./svg/${hand === 'left' ? 'left-hand' : 'right-hand'}/${count <= 4 ? count : '0'}-finger-svgrepo-com.svg`;
        handElement.classList.remove('selected');
      }
    };
  
    const endTurn = () => {
      if (selectedHand) {
        const previousSelectedHand = document.getElementById(`${selectedHand.player}-${selectedHand.hand}`);
        if (previousSelectedHand) {
          previousSelectedHand.classList.remove('selected');
        }
      }
      selectedHand = null;
      currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  
      if (checkGameOver()) {
        alert(`${currentPlayer === 'player1' ? 'Player 2' : 'Player 1'} wins!`);
        resetGame();
      }
    };
  
    const checkGameOver = () => {
      return (hands.player1.left > 4 && hands.player1.right > 4) || (hands.player2.left > 4 && hands.player2.right > 4);
    };
  
    const resetGame = () => {
      hands.player1.left = 1;
      hands.player1.right = 1;
      hands.player2.left = 1;
      hands.player2.right = 1;
      updateHandDisplay('player1', 'left');
      updateHandDisplay('player1', 'right');
      updateHandDisplay('player2', 'left');
      updateHandDisplay('player2', 'right');
      currentPlayer = 'player1';
      selectedHand = null;
    };
  
    window.selectHand = selectHand;
    window.split = split; // Expose split function globally
  });
  