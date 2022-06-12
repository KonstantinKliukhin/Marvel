import './charList.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from '../../services/marvelService';
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const {loading, error, getAllCharacters} = useMarvelService();
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const itemRefs = useRef([]);


    useEffect(() => {
        onRequest(0, true);
    }, []);

    const onCharLoaded = (newCharList) => {
        const ended = newCharList.length < 9;

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setCharEnded(ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
                          .then(onCharLoaded)
    }

    const focusOnItem = (i) => {
        itemRefs.current.forEach((elem) => elem.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
        itemRefs.current[i].focus();
    }

    function renderItems(arr) {
        const items = arr.map(({id, name, thumbnail}, i) => {
            const imgStyle = {objectFit: 'cover'};
        
            if (thumbnail && thumbnail.includes('image_not_available.jpg')) {
                imgStyle.objectFit = 'unset';
            }

            return (
                <li key={id} 
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} 
                    className={'char__item'} 
                    onClick = {() => {
                        props.onCharSelected(id)
                        focusOnItem(i)
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(id);
                            focusOnItem(i)
                        }
                    }}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            );
        })

        return (
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button disabled={newItemLoading} 
                    onClick={() => onRequest(charList.length)} 
                    className="button button__main button__long"
                    style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
            
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;