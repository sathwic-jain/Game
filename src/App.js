import {useState} from 'react';
import {useHistory} from 'react-router';
import './App.css';
import AppBar from '@mui/material/AppBar';

function App() {
  const history=useHistory();
  const[character,setChar]=useState(null);
  const [choose,setchoose]=useState(true);
  return (
    <div className="outer">
      <AppBar position="relative">
      <h1 className="head">Tic Tac Toe</h1>
      </AppBar>
    <div className="App">
     {choose? (<div className="choose">
        <div>Choose your character:</div>
        <div className="options">
          <p className="char" onClick={()=>setChar("X")}>X</p>
          <p className="char" onClick={()=>setChar("O")}>O</p>
        </div>
      </div>):""}
     {character!==null?<Game character={character} setchoose={setchoose}/>:""}
    </div>
    <button onClick={()=>setchoose(true)}>back</button>
    </div>
  );
}

function Game({character,setchoose}){
  setchoose(false);
  const [board,setBoard]=useState([null,null,null,null,null,null,null,null,null]);
  const character2=(character==="X")?"O":"X";
   const decideWinner=(board)=>{
      const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      for(let i=0;i<lines.length;i++){
        const [a,b,c]=lines[i]
        if(board[a]!==null && board[a]===board[b] && board[a]===board[c]){
          return board[a];
        }
      }
      return null; //no winner
    };
    const winner=decideWinner(board);
    
  const [isXTurn,setisXTurn]=useState(true);
  const [stats,setStatus]=useState(true);
 
  
  const handleClick =(index)=>{
      console.log(index);

      if(!board[index] && !winner ){
      const boardCopy=[...board]
     boardCopy[index]= isXTurn? character :character2;
     setBoard(boardCopy);
     setisXTurn(!isXTurn);
     let leftout=boardCopy.filter((element)=>element===null);
    if(leftout.length===0 && winner==null)setStatus(false);
     console.log(stats);
  }

}
  return(
    <div className="shit">
    <div className="board">
    {board.map((val,index)=>(
      <GameBox val={val} onPlayerClick={()=> handleClick(index)} character={character}/>))}
  </div>
  <h1 className="result">{character!==null && winner===null ?`${stats ?`Turn of player:${isXTurn? character :character2}`:"It's a draw"}`:""}</h1>
  <h1 className="result" style={{color:'white'}}>{(winner!==null)?`Winner is : ${winner}`:""}</h1>
  </div>
  )
}

function GameBox({val,onPlayerClick,character}){
const styles={ color: val === character ? "green" :"red"}
return(
  
  <div className="game-box"
  style={styles}
   onClick={onPlayerClick}>{val}
  </div>
)
}


export default App;
