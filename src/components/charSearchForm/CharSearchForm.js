import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import useMarvelService from '../../services/marvelService';
import ErrorMessage from '../errorMessage/ErrorMessage'
import {Link} from 'react-router-dom';
import './charSearchForm.scss'


const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const searchChar = (name) => {
        clearError();

        getCharacterByName(name.charName).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        console.log(char.length)

        setChar(char);
    }

    const results = !char ? null : char.length > 0 ?
    (<div className="char__search-wrapper">
        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
        </Link>
    </div>) : 
    (<div className="char__search-error">
        The character was not found. Check the name and try again
    </div>);

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    
    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: '',
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is empty'),
                })}
                onSubmit={charName => searchChar(charName)}
            >
                <Form>
                    <label htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id='charName'
                            name='charName'
                            type='text'
                            placeholder='Enter name'/>
                        <button
                            className="button button__main"
                            type='submit'
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component='div' className='char__search-error' name='charName'/>
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;