const RhymeButton = (props) => {

    const {datamuseRequest, getDatamuseRhymeUrl, rhyme, inputWords} = props;
    return (
        <button type="button" className="btn btn-primary"
        onClick={()=>datamuseRequest(getDatamuseRhymeUrl(inputWords),rhyme)}>
            Show rhyming words
        </button>
    )
};

export default RhymeButton;