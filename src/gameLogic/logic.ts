export const setColor = (
    currentWord:string,
    correctWord:string,
    setGrayLetters:(letter: string) => void,
    setGreenLetters:(letter: string) => void,
    setYellowLetters:(letter: string) => void)=>
{

  currentWord.split("").forEach((ch,index)=>
  {
      if (ch === correctWord[index])
      {
          setGreenLetters(ch);
      }
      else if(correctWord.includes(ch))
      {
         setYellowLetters(ch);
      }
      else
      {
        setGrayLetters(ch);
      }
  })

}