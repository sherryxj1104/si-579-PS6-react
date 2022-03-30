import {useState} from 'react';
import SavedWords from "./SavedWords"
import RhymeButton from "./RhymeButton"
import SynonymsButton from "./SynonymsButton"

const OutputList = () => {
    const [inputWords, setInputWords] = useState();
    const [outputWord, setOutputWord] = useState();
    const [savedWords, setSavedWords] = useState([]);

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
    };

    function getDatamuseRhymeUrl(rel_rhy) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': inputWords})).toString()}`;
    }

    const datamuseRequest = (url, callback) => {
        setOutputWord(()=>{
        return <p>...Loading</p>
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

    

    function generateWords(term) {
        console.log("0000",term);
        const wordlist = term.map((words)=>{
            // console.log("wwww",words.word);
            return <li key={"wd"+words.word}>{words.word} <button onClick={()=>addToSavedWords(words.word)} type="button" className="btn btn-secondary">(save)</button> </li>
        });
        return wordlist;
    }


    const rhyme = (result) => {
        // console.log("reult here!!!",result);
        const groupOutput = groupBy(result,"numSyllables");
        // console.log("!!!!",Object.entries(groupOutput));
        const wordToShow = [];
        if (result.length !== 0) {
            wordToShow.push(<h2 key="title">Words that rhyme with {inputWords}: </h2>);
            Object.entries(groupOutput).map(([numSyllables,items],index)=>{
                // console.log("@@@@",items);
                wordToShow.push(
                    <div key={index}>
                        <h3 key={'title'+index}>Syllables: {numSyllables} </h3>
                        <ul key={'ul'+index}>
                            {generateWords(items)}
                        </ul>
                    </div>
                )
            })
        } else {
            wordToShow.push(<p>(no results)</p>);
        }
        setOutputWord(wordToShow);
    };

    function addToSavedWords(item) {
        setSavedWords((previousList)=> {
            // console.log(previousList)
            return [...previousList,item]
        })
    };

    return (
        <>
            <div className="row">
            <SavedWords savedWords={savedWords}/>
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
                        // console.log(inputWords);
                        // console.log(`https://api.datamuse.com/words?rel_rhy=${inputWords}`);
                        datamuseRequest(getDatamuseRhymeUrl(inputWords),rhyme);
                    }}}
                    />
                    <RhymeButton
                        inputWords={inputWords}
                        rhyme={rhyme}
                        datamuseRequest={datamuseRequest}
                        getDatamuseRhymeUrl={getDatamuseRhymeUrl}
                    />
                    <SynonymsButton
                        inputWords={inputWords}
                        datamuseRequest={datamuseRequest}
                        generateWords={generateWords}
                        setOutputWord={setOutputWord}
                    />
                </div>
            </div>
            <div className="row">
                <h2 className="col"></h2>
            </div>
            <div className="output row">
                <output className="col">{outputWord}</output>
            </div>
        </>
    )
}

export default OutputList;