import './charList.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import MarvelService from '../../services/marvelService';
import { Component } from 'react';
import PropTypes from 'prop-types';


class CharList extends Component {
    // const className = 'char__item_selected';
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        charEnded: false,
    }

    componentDidMount() {
        this.onRequest()
    }

    marvelService = new MarvelService();

    onCharLoaded = (newCharList) => {
        const ended = (newCharList.length < 9) ? true : false;
        this.setState(({charList}) => {
            return {
                charList: [...charList, ...newCharList], 
                loading: false,
                newItemLoading: false,
                charEnded: ended,
              }
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
                          .then(this.onCharLoaded)
                          .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    itemRefs = []

    setItemRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (i) => {
        this.itemRefs.forEach((elem) => elem.classList.remove('char__item_selected'));
        this.itemRefs[i].classList.add('char__item_selected');
        this.itemRefs[i].focus();
    }

    renderItems = (arr) => {
        const items = arr.map(({id, name, thumbnail}, i) => {
            const imgStyle = {objectFit: 'cover'};
        
            if (thumbnail && thumbnail.includes('image_not_available.jpg')) {
                imgStyle.objectFit = 'unset';
            }

            return (
                <li key={id} 
                    tabIndex={0}
                    ref={this.setItemRef} 
                    className={'char__item'} 
                    onClick = {() => {
                        this.props.onCharSelected(id)
                        this.focusOnItem(i)
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharSelected(id);
                            this.focusOnItem(i)
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

    render() {
        const {charList, error, loading, selectedElementID, newItemLoading, charEnded} = this.state;
    
        const items = this.renderItems(charList, selectedElementID);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
    
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button disabled={newItemLoading} 
                        onClick={() => this.onRequest(charList.length)} 
                        className="button button__main button__long"
                        style={{'display': charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
                
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;