import unionIcon from '../../images/union.svg';
import errorImage from '../../images/error.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_modal ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__infotooltip">
                <img className="popup__register-image" src={props.status ? unionIcon : errorImage} alt="Значок успешности/неуспешности авторизации" />
                <p className="popup__answer">{props.status ? props.succes : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;