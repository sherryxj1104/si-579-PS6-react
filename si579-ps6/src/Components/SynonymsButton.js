const SynonymsButton = (props) => {
    const {datamuseRequest,inputWords, generateWords, setOutputWord} = props;

    function getDatamuseSimilarToUrl(ml) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': inputWords})).toString()}`;
    };

    function showSynonyms(output) {
        console.log(output);
        const wordToShow = [];
        if (output.length !== 0 ) {
            wordToShow.push(<h2 key="titleSyn">Words with a similar meaning to {inputWords}: </h2>)
                wordToShow.push(
                        <ul key='ul'>
                            {generateWords(output)}
                        </ul>
                );
        } else {
            wordToShow.push(<p>no result</p>);
        }
        setOutputWord(wordToShow);
    };

    const synonyms = () => {
        datamuseRequest(getDatamuseSimilarToUrl(inputWords),showSynonyms)
    };

    return (
        <button onClick={synonyms} type="button" className="btn btn-secondary">Show synonyms</button>
    )
};

export default SynonymsButton;