import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const initialVotes = new Array(props.anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  const [mostFrequent, setMostFrequent] = useState("");

  const handleClickNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }
  const handleClickVote = () => {
    // console.log("selected",selected)
    // const copyVotes = [...votes]
    // console.log('copyVotes', copyVotes);
    // copyVotes[selected]+=1;
    // console.log("copyVotes[selected]",copyVotes[selected])
    // console.log("copyVotes",copyVotes);
    // setVotes(()=>[...copyVotes])
    // console.log("votes state",votes)
    // console.log("------------------")

    votes[selected] += 1;
    setVotes([...votes])
    //console.log(selected);
    //console.log(votes);
    //index of the largest number from votes array
    let i = votes.indexOf(Math.max(...votes));
    //console.log("index ",i);
    //console.log(props.anecdotes[i]);
    let mostFrequent = `${props.anecdotes[i]} has ${Math.max(...votes)}`;
    setMostFrequent(mostFrequent)
  }
  
  return (
    <div>
      <h1>Andecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      <button onClick={handleClickVote}>Vote</button>
      <button onClick={handleClickNextAnecdote}>next anecdote</button>

      {(mostFrequent !== "") &&
        <div>
          <h1>Anecdote with most votes</h1>
          {mostFrequent}
        </div>
      }
    </div>
  )
}
//////
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';

// const Header = ({ text }) => (
//   <div>
//     <h1>{text}</h1>
//   </div>
// );

// const Button = ({ text, handleClick }) => (
//   <div style={{ margin: '20px' }}>
//     <button className="button" onClick={handleClick}>
//       {text}
//     </button>
//   </div>
// );

// const Anecdote = ({ anecdote, votes }) => (
//   <div>
//     <p> {anecdote}</p>
//     <p>has {votes} votes</p>
//   </div>
// );

// const App = ({ anecdotes }) => {
//   const initialVotes = Array(anecdotes.length).fill(0);

//   const [selected, setSelected] = useState(0);
//   const [votes, setVote] = useState(initialVotes);

//   const showAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));

//   const voteAnecdote = () => {
//     const copy = [...votes];
//     copy[selected] += 1;
//     setVote(copy);
//   };

//   const maxVotes = Math.max(...votes);
//   const mostVoted = anecdotes[votes.indexOf(maxVotes)];

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//       <Header text="Anecdote of the day" />
//       <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />

//       <Button text="Vote" handleClick={voteAnecdote} />
//       <Button text="Next Anecdote" handleClick={showAnecdote} />

//       <Header text="Anecdote with most votes" />
//       <Anecdote anecdote={mostVoted} votes={maxVotes} />
//     </div>
//   );
// };

// const anecdotes = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
