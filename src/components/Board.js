// Board.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Tile from './Tile';
import Cell from './Cell';
import GameOverlay from './GameOverlay';
import { Board } from '../helper';
import { ConnectWallet, useAddress, useContract } from '@thirdweb-dev/react';
import { abi } from "./abi";
import Eventbox from './eventbox';
import { buttonrecorderca } from './const';

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
  const year = new Date().getFullYear();
  const contractAddress = buttonrecorderca;
  const { contract } = useContract(contractAddress, abi);
  const address = useAddress();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const handleDirectionClick = async (direction) => {
    if (board.hasWon() || loading) {
      return;
    }
  
    setLoading(true);
  
    try {
      const directionMap = ['left', 'up', 'right', 'down'];
      const directionValue = directionMap[direction];
  
      console.log('Button direction:', direction, 'Mapped value:', directionValue);
  
      const data = await contract.call("recordButtonPress", [directionValue]);
      console.log('Button press recorded:', data);
  
      let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    } catch (error) {
      console.error('Error recording button press:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Board Updated:', board);
  }, [board]);

  const resetGame = () => {
    setBoard(new Board());
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
            <div style={{ marginLeft: "200px"}}>
          <ConnectWallet />
          </div>
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
        <div> 
          <div className='score-box'>
            <div className='score-header'>SCORE</div>
            <div>{board.score}</div>
          </div>
          <Eventbox/>
        <div className="grid-container">
        <button className="grid-item" onClick={() => handleDirectionClick(1)} disabled={loading} style={{ cursor: 'pointer' }}
>
          ↑
        </button>
        <button className="grid-item" onClick={() => handleDirectionClick(0)} disabled={loading} style={{ cursor: 'pointer' }}
>
          ←
        </button>
        <button className="grid-item" onClick={() => handleDirectionClick(3)} disabled={loading} style={{ cursor: 'pointer' }}
>
          ↓
        </button>
        <button className="grid-item" onClick={() => handleDirectionClick(2)} disabled={loading} style={{ cursor: 'pointer' }}
>
          →
        </button>
      </div>
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
                                <small>&copy; Copyright {year}</small>
                                </p>
                                <div className='resetButton' onClick={closeModal}>Close</div>
                            </div>  
                    </div>
        </Modal>
        
      )}
    </div>
    
  );
}
