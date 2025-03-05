import { create } from 'zustand';

interface StatusStore {
    greenLetters: Array<string | undefined > ,
    grayLetters: Array<string  | undefined > ,
    yellowLetters: Array<string  | undefined > ,
    correctWord: string,
    played:number,
    win:number,
    gameHistory:Array<boolean | undefined >,
    setCorrectWord: (correctWord:string | undefined ) => void;
    setGreenLetters:(letter : string)=>void
    setGrayLetters:(letter : string)=>void
    setYellowLetters:(letter : string)=>void
    setGamePlayed:()=>void
    setWin:()=>void
    setGameHistory:(gameResult:boolean)=>void
}

const useStatusStore = create<StatusStore>()(set => ({
    greenLetters: [],
    grayLetters: [],
    yellowLetters: [],
    correctWord:"banca",
    played:0,
    win:0,
    gameHistory:[],
    setCorrectWord:correctWord =>set({correctWord}),
    setGreenLetters: (letter) =>{
        set((state) => ({ greenLetters: [...state.greenLetters, letter] }))},
    
      setGrayLetters: (letter) =>{
        set((state) => ({ grayLetters: [...state.grayLetters, letter] }))},
    
      setYellowLetters: (letter) =>{
        set((state) => ({ yellowLetters: [...state.yellowLetters, letter] }))},

      setGamePlayed:()=>
      {
        set((state)=>({played: state.played+1}))
      },
      setWin:()=>
        {
          set((state)=>({win: state.win+1}))
        },
      setGameHistory: (gameResult) =>{
          set((state) => ({ gameHistory: [...state.gameHistory, gameResult] }))},  
   
}));

export default useStatusStore;