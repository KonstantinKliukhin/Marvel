
import { useState, useTransition, useEffect } from 'react';
import useMarvelService from '../../services/marvelService';
import ErrorMessage from '../errorMessage/ErrorMessage'
import {Link} from 'react-router-dom';
import './charSearchForm.scss'


const CharSearchForm = () => {
    const [CharsInputValue, setCharsInputValue] = useState('');
    const [charsSearchValue, setCharsSearchValue] = useState('');
    const [chars, setChars] = useState(null);
    const {loading, error, clearError, getCharacterByPartOfName} = useMarvelService();
    const [isPending, startTransition] = useTransition();

    const onSearchChars = (inputValue) => {
        setCharsInputValue(inputValue);
        if (inputValue) {
            clearError();
            startTransition(() => {
                setCharsSearchValue(inputValue);
            })
        }
    }

    useEffect(() => {
        if (charsSearchValue) {
            getCharacterByPartOfName(charsSearchValue).then(onCharLoaded);
        }
    }, [charsSearchValue])


    const onCharLoaded = (chars) => {
        setChars(chars);
    }

    const charsLoading = (loading || isPending) ? 
    (<div className="char__search-loading">
        The characters are loading...
    </div>) : null;

    const results = !chars || loading || isPending || !CharsInputValue ? null : chars.length > 0 ?
        (<div className="char__search-wrapper">
            <div className="char__search-success">Look on variatns:</div>     
            <ul>
                {chars.map(({name, id}) => (
                    <li  key={id} className="char__search__item">
                        <Link style={{width: '100%'}} to={`/characters/${id}`} >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>) : 
        (<div className="char__search-error">
            The characters was not found. Check the name and try again
        </div>);

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    
    return (
        <div className="char__search-form">
            <form>
                <label htmlFor="charName" style={{display: 'flex', justifyContent:'center', fontWeight:'600'}}>Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input
                        id='charName'
                        name='charName'
                        type='text'
                        value={CharsInputValue}
                        placeholder='Enter name'
                        onChange={(e) => onSearchChars(e.target.value)}/>
                </div>
                <div className='char__search-error'></div>
            </form>
            {results}
            {charsLoading}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;