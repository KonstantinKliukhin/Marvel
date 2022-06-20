import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/marvelService';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const setContent = (process,Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/> 
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('unexpected process state');
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const {process, setProcess, getAllComics} = useMarvelService();
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const itemRefs = useRef([]);

    useEffect(() => {
        onRequest(0, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicsLoaded = (newComicsList) => {
        const ended = newComicsList.length < 8;
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const items = arr.map(({id, title, thumbnail, price}, i) => {

            const imgStyle = {objectFit: 'cover'};
        
            if (thumbnail && thumbnail.includes('image_not_available.jpg')) {
                imgStyle.objectFit = 'unset';
            }

            return (
                <li key={i} 
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} 
                    className={'comics__item'} 
                    onClick = {() => {
                        itemRefs.current[i].focus();
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            itemRefs.current[i].focus();
                        }
                    }}>
                    <Link to={`${id}`}>
                        <img src={thumbnail} alt={title} style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            );
        })

        return (
            <ul className='comics__grid'>
                {items}
            </ul>
        )
    }

    return (
        
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button disabled={newItemLoading} 
                    onClick={() => onRequest(comicsList.length)} 
                    className="button button__main button__long"
                    style={{'display': comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;