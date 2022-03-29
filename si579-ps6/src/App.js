import './App.css';
import { useState } from "react";
import SavedWords from './Components/SavedWords';
import RhymeButton from './Components/RhymeButton';
import SynonymsButton from './Components/SynonymsButton';
import WordInstance from './Components/WordInstance';


function App() {
  const [inputWords, setInputWords] = useState();
  const [wordOutput, setWordOutput] = useState();
  const [savedWord, setSavedWord] = useState();

  function groupBy(objects, property){
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}

  function getDatamuseRhymeUrl(rel_rhy) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': inputWords})).toString()}`;
  }

  const datamuseRequest = (url, callback) => {
    setWordOutput(()=>{
      return <h2>...Loading</h2>
    });
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // This invokes the callback that updates the page.
            callback(data);
        }, (err) => {
            console.error(err);
        });
  };


  const rhyme = (result) => {
    // console.log(result);
    const groupOutput = groupBy(result,"numSyllables");
    const wordToShow = [];
    if (result.length !== 0) {
      wordToShow.push(<h2 key="title">Words that rhyme with ${inputWords}: </h2>);
      Object.entries(groupOutput).forEach((syllable,index)=>
      wordToShow.push(
        <>
      <h3 key={index}> Syllables: ${syllable}</h3>
      <ul key="syllList">{WordInstance}</ul></>
      ))
    }
  };


  return (
    <main className="container">
      <h1 className="row">Rhyme Finder 579 (Problem Set 6)</h1>
      <h2>My Github Code link: <a href="https://github.com/sherryxj1104/si-579-PS6-react/tree/PS2/si579-ps6">https://github.com/sherryxj1104/si-579-PS6-react/tree/PS2/si579-ps6</a> </h2>
      <p>There is something wrong with my github repo. I am not sure how to solve this problem. So, this repo will have some other folders from this course. </p>
      <div className="row">
        <SavedWords SavedWords={savedWord}/>
      </div>
      <div className="row">
        <div className="input-group col">
            <input className="form-control" type="text" placeholder="Enter a word"
            onChange={(e)=>{
              setInputWords(e.target.value);
              // console.log(e.target.value);
            }}

            onKeyDown={(e) => {
              if (e.key==="Enter"){
                console.log(`https://api.datamuse.com/words?rel_rhy=${inputWords}`);
                datamuseRequest(getDatamuseRhymeUrl(inputWords),rhyme);
              }
            }

            }

            />
            <RhymeButton
            inputWords={inputWords}
            rhyme={rhyme}
            />
            <SynonymsButton
            inputWords={inputWords}
            />
        </div>
      </div>
      <div className="row">
        <h2 className="col"></h2>
      </div>
      <div className="output row">
        <output className="col"></output>
      </div>
    </main>
  );
}

export default App;
