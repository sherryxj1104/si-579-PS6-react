const WordInstance = (props) => {
    const save = () => {
        props.setSaveWord((word)=>{
            return word;
        })
    };
    return (
        <li>{props.word} <button obclick={save} type="button" className="btn btn-secondary">(save)</button> </li>
    )
};

export default WordInstance;