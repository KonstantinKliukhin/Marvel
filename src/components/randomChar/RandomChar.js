import { useState, useEffect} from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/marvelService';
import setContent from '../../utils/setContent';

const RandomChar = () =>{
    const [char, setChar] = useState({});

    const {process, setProcess, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, []);

    const toCorrectDescription = (char) => {
        let descr = char.description;
        char.description = (descr.length > 215) ?
                         `${descr.slice(0, 215)}...` :
                         descr || 'No information about this Character ('
        return char;
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
                    .then(toCorrectDescription)
                    .then(onCharLoaded)
                    .then(() => setProcess('confirmed'));

    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({data: {name, description, thumbnail, homepage, wiki}}) => {
    
    const imgStyle = {objectFit: 'cover'};

    if (thumbnail && thumbnail.includes('image_not_available.jpg')) {
        imgStyle.objectFit = 'unset';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" 
                                 className="randomchar__img" 
                                 style = {imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage}  rel="noreferrer" target='_blank' className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki}  rel="noreferrer" target='_blank' className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;