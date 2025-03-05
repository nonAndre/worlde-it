import clsx from 'clsx';
import '../styles.css'
import useStatusStore from '../store/statusStore';
import { useEffect } from 'react';

export default function Keyboard({setPhrase}:{setPhrase : (ch:string)=>void}) {
    
    const test = 0;   

    const qwertyKeys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['ENTER','z', 'x', 'c', 'v', 'b', 'n', 'm','⌫']
      ];
    
      const onClick =(ch: string) => {  
         setPhrase(ch)
      };

      const {grayLetters,greenLetters,yellowLetters} = useStatusStore();
      
      const getColor = (ch:string)=>
      {
          if (greenLetters.includes(ch))
          {
            return "bg-[#6ca965] text-white";
          }
          else if (yellowLetters.includes(ch))
          {
            return "bg-[#c8b653] text-white";
          }
          else if (grayLetters.includes(ch))
          {
              return "bg-[#787c7f] text-white";
          }
          else
          {
            return "bg-gray-200 text-black";
          }
      }
      
      const keyDownHandler =(event:any)=>
      {
          if (event.key === "Enter")
          {
            setPhrase('ENTER');
          }
          else if(event.key === "Backspace")
          {
            setPhrase('⌫');
          }
          else if ( event.key >= "a" && event.key<="z")
          {
            setPhrase(event.key);
          }
          else{

            console.log("Character not allowed");
          }
          
      };


      useEffect(() => {
          document.addEventListener('keydown',keyDownHandler)
          
          return ()=>{
            document.removeEventListener('keydown',keyDownHandler)
          }

      }, []);


  return (
    <div className='flex flex-col items-center justify-between'>
    <div className='flex flex-col items-center px-3 pb-24 gap-2'>
        {
        qwertyKeys.map((row,index)=>(
         <div key={index} className="flex gap-2 items-center">
            {row.map((letter,number)=>(
                <button onClick={()=>onClick(letter)} key={number} className={clsx(
                  'h-12 px-3 py-2 font-bold',
                  getColor(letter)
                )}>
                    <p className='font-bold'>{letter}</p>
                    </button>
            ))}
        </div>))
    }</div>
    </div>
  )
}
