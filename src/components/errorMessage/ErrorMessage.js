import ErrorImg from './error.gif';
import './ErrorMessage.scss';

const ErrorMessage = () => {
    return (
        <img className='error__image' alt='error' src={ErrorImg}/>
    )
}

export default ErrorMessage;