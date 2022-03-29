const SynonymsButton = (props) => {

    const synonyms = () => {
        props.setUrl(()=>{
            return `https://api.datamuse.com/words?ml=`+props.inputWords;
        })

        console.log("!!!!",props);
    }
    return (
        <button onClick={synonyms} type="button" className="btn btn-secondary">Show synonyms</button>
    )
};

export default SynonymsButton;