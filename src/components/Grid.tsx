import { useEffect, useRef, useState } from "react";
import { allWords } from "../words/allword";
import {setColor } from "../gameLogic/logic";
import useStatusStore from "../store/statusStore";
import clsx from "clsx";
import {motion} from 'framer-motion';
import WinPanel from "./WinPanel";
import LosePanel from "./LosePanel";
import { toast, ToastContainer } from "react-toastify";

const ROWS = 6;
const COLS = 5;

export default function Grid({letter,setBuffer}:{letter:string,setBuffer:any}) {
  
  const {correctWord,greenLetters,grayLetters,yellowLetters,setCorrectWord,setGrayLetters,setGreenLetters,setYellowLetters,setGamePlayed,setWin,setGameHistory} = useStatusStore();
   
  const [rows, setRows] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  
  const [curRow,setCurRow] = useState(0);
  const [curCol,_setCurCol] = useState(0);
  const colStateRef = useRef(curCol);


  const [openWinPanel,setOpenWinPanel] = useState(false);
  const [openLosePanel,setOpenLosePanel] = useState(false);

  const [reset,setReset] = useState(false);

  const setCurCol = (col:number)=>
  {
    colStateRef.current = col;
    _setCurCol(col);
  }

  const showToast = () => toast.error("Non nella lista di parole", {
    autoClose: 2500
    });
  
  const checkWord = ()=>
  {     
        if (curRow < 5)
        {

          const currentWord = rows[curRow].join('');
         
          if (currentWord.length == 5 && allWords.includes(currentWord))
          {
            if (currentWord === correctWord)
            {
              setColor(currentWord,correctWord,setGrayLetters,setGreenLetters,setYellowLetters);
              setCurRow(curRow+1);
              setCurCol(0);
              setGameHistory(true);
              setWin();
              setGamePlayed();
              setOpenWinPanel(true);
            }
            else
            {
             setColor(currentWord,correctWord,setGrayLetters,setGreenLetters,setYellowLetters);
             setCurRow(curRow+1);
             setCurCol(0);
            }
         }
         else if (currentWord.length <= 5 || !allWords.includes(currentWord))
         {
           showToast();
         }
       }   
       else if (curRow === 5 && reset === false)
       {
          setGameHistory(false);
          setGamePlayed();
          setOpenLosePanel(true);
       }     
  };


  const addKey = (key : string ) =>
  { 
     
    const newRows =[...rows.map((row) => [...row])];
    
    
    if (key === 'ENTER')
    {
      checkWord();
    }
    else if (key === '⌫')
    {
       if (colStateRef.current >= 1)
       {
          newRows[curRow][colStateRef.current-1] = '';
          setRows(newRows);
          setCurCol(colStateRef.current-1);
       }
    }
    else if (colStateRef.current >= newRows[curRow].length)
    {
        return;
    }
    else
    {   
        newRows[curRow][colStateRef.current] = key;
        setRows(newRows);
        setCurCol(colStateRef.current+1);
    }
    
    
  }

  const getCellColor = (cell:string , rowIndex:number,cellIndex:number)=>
  {    
       if (curRow>rowIndex)
       {
          if (correctWord[cellIndex] === cell)
          {
              return "bg-[#6ca965] text-white";
          }
          else if (correctWord.includes(cell))
          {
              return "bg-[#c8b653] text-white";
          }
          else 
          {
              return "bg-[#787c7f] text-white";
          }
        }

          return "text-black bg-white";

          
  }

  const getCellAnimation = (rowIndex: number,cellIndex:number) => {
    if (curRow > rowIndex) {
      return {
        initial: { rotateX: 0 },
        animate: { rotateX: 180  },
        transition: { duration: 0.5, ease: "easeInOut" , delay:cellIndex*0.2},
      };
    }
    return {};
  }; 

  const clean = () =>
  {
    if (reset)
    {
      setRows(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
      setCurCol(0);
      setCurRow(0);
      setCorrectWord(allWords[Math.floor(Math.random()*allWords.length)]);
      greenLetters.length = 0;
      grayLetters.length=0;
      yellowLetters.length = 0;
    }
     setReset(false);
  }

  useEffect(()=>
  {
    console.log(correctWord); 

    if (letter !== "" && letter !== null && letter!==undefined )
    {
        addKey(letter);
    }
     
    setBuffer("");

  }  ,[letter]);

  useEffect(()=>
  {
    clean();
  },[reset])


  return (
    <>
    <WinPanel openWinPanel={openWinPanel} setOpenWinPanel={setOpenWinPanel} setReset={setReset}/>
    <LosePanel  openLosePanel={openLosePanel} setOpenLosePanel={setOpenLosePanel} setReset={setReset}/>
    <ToastContainer className="pt-24  text-white"  position="top-center" autoClose={2500} theme="colored"/>

    <div className="flex flex-col items-center gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row gap-1">
          {row.map((cell, cellIndex) => (
            <motion.div
              key={cellIndex}
              className={clsx("w-14 h-14 flex items-center justify-center border border-black animate-fade-in",getCellColor(cell,rowIndex,cellIndex))}
              {...getCellAnimation(rowIndex,cellIndex)}
            >
              <motion.p {...getCellAnimation(rowIndex,cellIndex)}>{cell}</motion.p>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}
