// Board.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Tile from './Tile';
import Cell from './Cell';
import GameOverlay from './GameOverlay';
import { Board } from '../helper';
import { ConnectWallet, useAddress, useContract } from '@thirdweb-dev/react';
import { abi } from "./abi";


const customStyles = {
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    background: '#57407c',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '9px',
    outline: 'none',
    padding: '20px'
  }
};

Modal.setAppElement('#root');

export default function BoardView() {
  const [board, setBoard] = useState(new Board());
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const year = new Date().getFullYear(); // Add this line to define 'year'


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDirectionClick = (direction) => {
    if (board.hasWon()) {
      return;
    }

    let adjustedDirection;
    switch (direction) {
      case 0: // Up
        adjustedDirection = 0;
        break;
      case 1: // Right
        adjustedDirection = 1;
        break;
      case 2: // Down
        adjustedDirection = 2;
        break;
      case 3: // Left
        adjustedDirection = 3;
        break;
      default:
        adjustedDirection = direction;
    }

    let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
    let newBoard = boardClone.move(adjustedDirection);
    setBoard(newBoard);
  };

  useEffect(() => {
    console.log('Board Updated:', board);
  }, [board]);

  const resetGame = () => {
    setBoard(new Board());
  };



  const contractAddress = '0x4AF71ce8676c24258eDb5a096bACaA3C6ab6a402';
  const { contract } = useContract(contractAddress, abi);
  const address = useAddress();

  const handleRecordButtonPressup = async () => {
    try {
      // Assuming 'recordButtonPress' is a method in your smart contract ABI
      const data = await contract.call("recordButtonPress", ["up"]);
      console.log('Button press recorded:', data);
      // After the transaction is successful, update the game board
      handleDirectionClick(1);
    } catch (error) {
      console.error('Error recording button press:', error);
    }
  };

  const handleRecordButtonPressleft = async () => {
    try {
      // Assuming 'recordButtonPress' is a method in your smart contract ABI
      const data = await contract.call("recordButtonPress", ["left"]);
      console.log('Button press recorded:', data);
      // After the transaction is successful, update the game board
      handleDirectionClick(0);
    } catch (error) {
      console.error('Error recording button press:', error);
    }
  };

  const handleRecordButtonPressdown = async () => {
    try {
      // Assuming 'recordButtonPress' is a method in your smart contract ABI
      const data = await contract.call("recordButtonPress", ["down"]);
      console.log('Button press recorded:', data);
      // After the transaction is successful, update the game board
      handleDirectionClick(3);
    } catch (error) {
      console.error('Error recording button press:', error);
    }
  };

  const handleRecordButtonPressright = async () => {
    try {
      // Assuming 'recordButtonPress' is a method in your smart contract ABI
      const data = await contract.call("recordButtonPress", ["right"]);
      console.log('Button press recorded:', data);
      // After the transaction is successful, update the game board
      handleDirectionClick(2);
    } catch (error) {
      console.error('Error recording button press:', error);
    }
  };

  return (
    <div>
      <div className='fixed-container'>
        <div className='details-box'>
          <div className='buttons'>
             <div className='resetButton margin-right' onClick={resetGame}>
              New Game
            </div>
            <div className='resetButton' onClick={openModal}>
              Game Rules
            </div>
          </div>
          <div className='score-box'>
            <div className='score-header'>SCORE</div>
            <div>{board.score}</div>
            <ConnectWallet/>
          </div>
        </div>
<div className='keyboard'>
        <div className='board'>
          {board.cells.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <Cell key={rowIndex * board.size + colIndex} />
              ))}
            </div>
          ))}
          {board.tiles
            .filter((tile) => tile.value !== 0)
            .map((tile, tileIndex) => (
              <Tile tile={tile} key={tileIndex} />
            ))}
          <GameOverlay onRestart={resetGame} board={board} />
        </div>
        <div className="grid-container">
      {/* First row, first item (spans all three columns) */}
      <button className="grid-item"onClick={handleRecordButtonPressup}>↑</button>

      {/* Second row, three items (one in each column) */}
      <button className="grid-item"onClick={handleRecordButtonPressleft}>←</button>
      <button className="grid-item" onClick={handleRecordButtonPressdown }>↓</button>
      <button className="grid-item" onClick={handleRecordButtonPressright}>→</button>
      </div>
      
    </div>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <div>
                        <div className='footer-rules'>
                                <div className='details-box'>
                                    <div className='text'>
                                        <span>Play 2048 Game Online</span>
                                        <p>Join the numbers and get to the <span>2048 tile!</span></p>
                                    </div>
                                </div>
                                <div className='details-box'>
                                    <div className='text'>
                                        <span>How to Play:</span>
                                        <p>
                                        Use your <span>arrow keys</span> to move the tiles. When two tiles with the same number touch, they <span>merge into one!</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='copyright'>
                                <p>
                                <small>&copy; Copyright {year}</small>, Cecilia Benitez
                                </p>
                                <div className='resetButton' onClick={closeModal}>Cancel</div>
                            </div>  
                    </div>
        </Modal>
        
      )}
    </div>
    
  );
}
