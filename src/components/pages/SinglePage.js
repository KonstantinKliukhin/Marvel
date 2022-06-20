import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/marvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [])

    const updateData = () => {
        clearError();
        switch(dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'char':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            default:
                throw new Error('page detection error')
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
    <>
        <AppBanner/>
        {setContent(process, Component, data)}
    </>
    )
}

export default SinglePage;

