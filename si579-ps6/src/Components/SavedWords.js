const SavedWords = (props) => {
    const {savedWords} = props;
    // console.log(typeof(savedWords));

    const savedWordsOutput = () => {
        if (savedWords.length !== 0){
            return savedWords.join(', ')
        }else {
            return "(none)"
        }
    }

    return (
        <div className="col">
            Saved words:
            <span>{savedWordsOutput()}</span>
        </div>
    )
};

export default SavedWords;