const RhymeButton = (props) => {

    return (
        <button onClick={props.rhyme} type="button" className="btn btn-primary">Show rhyming words</button>
    )
};

export default RhymeButton;