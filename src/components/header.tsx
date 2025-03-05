import { IoStatsChartSharp ,IoClose} from "react-icons/io5";
import '../styles.css'
import { Dialog, DialogPanel} from "@headlessui/react";
import { useEffect, useState } from "react";
import useStatusStore from "../store/statusStore";


function Header() {
   
  const [open,setOpen] = useState(false);
  const {win,played,gameHistory} = useStatusStore();
  const [maxStreak,setMaxStreak] = useState(0);
  const [currentStreak,setCurrentStreak] = useState(0);

  const close = ()=>
  {
    setOpen(false);
  }

  const getStreaksInfo = () => {
    let appo = [];
    let count = 0;
    let dim = gameHistory.length;
  
    for (let i = 0; i < dim; i++) {
      if (gameHistory[i] === true) {
        count++;
      } else {
        if (count > 0) {
          appo.push(count);
          count = 0;
        }
      }
    }
  
    if (count > 0) appo.push(count);
  
    setMaxStreak(appo.length > 0 ? Math.max(...appo) : 0);
  
    let current = 0;
    for (let i = dim - 1; i >= 0; i--) {
      if (gameHistory[i] === true) {
        current++;
      } else {
        break;
      }
    }
    setCurrentStreak(current);
  };
  
  
  useEffect (()=>
  {
      getStreaksInfo();
  },[gameHistory]);

  return (
    <div className='flex flex-row justify-between px-24 h-12 py-10 bg-white items-center w-full gap-2'>
            <p className='text-bold text-lg text-gray-400'>casuale</p>
            <p className='text-bold  text-5xl'>WORDLE</p>
            <button onClick={(e)=>{
              setOpen(true);
              e.currentTarget.blur();
            }}>
              <IoStatsChartSharp id="stats" size={30} />
            </button>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                              transition
                              className="border-2 border-black w-full max-w-md h-full  flex flex-col justify-center items-center rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                              <div className="justify-between flex flex-row w-full">
                                <p></p>
                                <IoClose className=" font-bold" size={24} onClick={()=>close()}/>

                              </div>

                               <h1 className="font-bold pb-5">Queste sono le tue statistiche</h1>
                               <div className="flex flex-row gap-4">
                                 <div className="flex flex-col">
                                       <p className="flex justify-center items-center">{played}</p>
                                       <p className="flex justify-center items-center">Partite</p>
                                       <p className="flex justify-center items-center">Giocate</p>
                                 </div>
                                 <div className="flex flex-col">
                                       <p className="flex justify-center items-center">{win}</p>
                                       <p>Vittorie</p>
                                 </div>
                                 <div className="flex flex-col">
                                       <p className="flex justify-center items-center">{currentStreak}</p>
                                       <p className="flex justify-center items-center">Current</p>
                                       <p className="flex justify-center items-center">Streak</p>
                                 </div>
                                 <div className="flex flex-col">
                                      <p className="flex justify-center items-center">{maxStreak}</p>
                                       <p className="flex justify-center items-center">Max</p>
                                       <p>Streak</p>
                                 </div>
                               </div>
                            </DialogPanel>
                          </div>
                        </div>
                      </Dialog>
         </div>
  )
}

export default Header;
