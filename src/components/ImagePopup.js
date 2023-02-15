function ImagePopup(props) {
    return (
        <div className={`popup popup_back-opacity_9 ${props.card.isVisible && "popup_opened"}`} >
            <div className="popup__figure-container">
                <button className="popup__cross popup__close" type="button" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__img" src={props.card.link} alt={props.card.name} />
                    <figcaption className="popup__img-name">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;