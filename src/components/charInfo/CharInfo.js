import { Component} from 'react';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/marvelService';
import PropTypes from 'prop-types';

class CharInfo extends Component {
    
    state = {
        char: null,
        loading: false,
        error: false,
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    marvelService = new MarvelService();

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService.getCharacter(charId)
                          .then(this.onCharLoaded)
                          .catch(this.onError);
    }

    onCharLoading = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onCharLoaded = (char) => {
        this.setState
        ({
          char, 
          loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }
    
    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ?  <View char = {char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char: {name, description, thumbnail, homepage, wiki, comics}}) => {
    console.log(description)
    const imgStyle = {objectFit: 'cover'};

    if (thumbnail && thumbnail.includes('image_not_available.jpg')) {
        imgStyle.objectFit = 'unset';
    }

    return (
        <>
            <div className="char__basics">
                    <img style={imgStyle} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage}  rel="noreferrer" target='_blank' className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki}  rel="noreferrer" target='_blank' className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length ? null : "We don't know about comics including this character yet"}
                    {comics.map(({name}, i) => {
                        return (
                        <li key={i} className="char__comics-item">
                            {name}
                        </li>
                        );
                    })}
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;