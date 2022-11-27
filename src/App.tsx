import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/Board/Board';
import CircularProgress from '@mui/material/CircularProgress';

interface dataProps{
  category:string,
  correct_answer:string,
  difficulty:string,
  incorrect_answers:string[],
  question:string,
  type:string
}

export const amount = 10
function App() {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  const [questions,setQuestions]=useState<dataProps[]>([])
  const [loading,setLoading] = useState(false)
  const [started,setStarted] = useState(false)
  const [validAnswer,setValidAnswer] = useState(0)
  const [numberQuest,setNumberQuest] = useState(0)
  const [options,setOptions] = useState<string[]>([])
  const [ans,setAns] = useState('')
  const [next,setNext] = useState(false)
  const [gameOver,setGameOver] = useState(false)
  const [disabled,setDisabled] = useState(false)

  useEffect(()=>{
    if (questions[numberQuest]!==undefined){
      const options = [...questions[numberQuest].incorrect_answers,questions[numberQuest].correct_answer]
      options.sort(() => Math.random() - 0.5);
      setOptions(options)
    }
  },[numberQuest,questions])

  const  fetchData = async ()=>{
      setLoading(true)
      const result = await axios(endpoint)
      setQuestions(result.data.results)
      setLoading(false)
      setStarted(true)
      setGameOver(false)
      setValidAnswer(0)
      setNumberQuest(0)
      setAns('')
      setDisabled(false)
  }
  const handleNext = ()=>{
    if (numberQuest<amount-1){
      setNumberQuest((c)=>c+1)
      setAns('')
      setDisabled(false)
    }else{
      setGameOver(true)
      
    }
    setNext(false)
  }

  return (
    <div className="App">
      <h1 className='header'>React Quiz</h1>
      {!started||gameOver?<button className='start' onClick={fetchData}>Start</button>:''}
      {loading?
        <div style={{marginTop:'40px'}}>
          <CircularProgress color="primary" />
        </div>:''}
      {started? 
      <>
        <h1 className='globalScore'>Score: {validAnswer}</h1>
        <Board 
          number={numberQuest} 
          data={questions[numberQuest]} 
          options={options} 
          setAns={(a)=>setAns(a)} 
          ans={ans}
          setNext={()=>setNext(true)}
          setValidAnswer={()=>setValidAnswer((c)=>c+1)}
          disabled={disabled}
          setDisabled={()=>setDisabled(true)}
        />
      </>
      :''}
      {next?<button className='start' onClick={handleNext}>Next</button>:''}
      
    </div>
  );
}

export default App;
