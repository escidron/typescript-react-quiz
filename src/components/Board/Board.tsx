import React,{useState} from 'react'
import './boardStyles.css'
import { Question,WrapQuestion } from '../Question/Question';

interface dataProps{
  category:string,
  correct_answer:string,
  difficulty:string,
  incorrect_answers:string[],
  question:string,
  type:string
}

interface Props{
  number:number,
  data:dataProps,
  options:string[],
  setAns:(a:string)=>void,
  ans:string,
  setNext:()=> void,
  setValidAnswer:()=>void
  disabled:boolean,
  setDisabled:()=>void

}
export default function Board ({number,data,options,setAns,ans,setNext,setValidAnswer,disabled,setDisabled}:Props) {
 

  const handleChoice = (option:string)=>{
    setAns(option)
    setNext()
    setDisabled()
    if (option===data.correct_answer){
      setValidAnswer()
    }
  }
  return (
    <div className='board'>
      <p className="score">Question {number+1}/ 10</p>
      <h4 dangerouslySetInnerHTML={{ __html: data.question }} />
      {
        options.map((option)=>(
          <WrapQuestion key={option} onClick={()=>handleChoice(option)} action={disabled&&'none'}>
            <Question key={option} color={(ans===data.correct_answer&&ans===option&&ans!=='')||(data.correct_answer===option&&ans!=='')?'#58c289':ans===option?'#ca6666':'#66b8cb'}>
              <p className='options' dangerouslySetInnerHTML={{ __html: option }}/>
            </Question>
          </WrapQuestion>
        ))
      }
    </div>
  )
}

