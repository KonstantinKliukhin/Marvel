// const privateKey = '';
import {useHttp} from '../hooks/http.hook'

const _apiBase = process.env.REACT_APP_API_URL;
const _apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();
    const _baseOffset = 210;

    const getAllCharacters = async (offset = 0) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${_baseOffset + offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name.replace(' ', '%20')}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByPartOfName = async (text) => {
        const res = await request(`${_apiBase}characters?nameStartsWith=${text}&limit=5&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comic) => ({
        id: comic.id,
        title: comic.title,
        price: comic.prices[0].price ? `${comic.prices[0].price}$`: 'FREE',
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        language: comic.textObjects.laguage || 'en-us',
        pageCount: comic.pageCount ? `${comic.pageCount} p.`: 'No information about the Number of pages',
        description: comic.description || 'There is no description',
    })

    const _transformCharacter = (char) => {
            const comics = char.comics.items.slice(0, 10);
            return {
                comics,
                id: char.id,    
                name: char.name,
                description: char.description, 
                thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
                homepage: char.urls[0].url, 
                wiki: char.urls[1].url,
            }
    }

    return {
            getAllCharacters, 
            getCharacter, 
            clearError, 
            getComic, 
            getAllComics, 
            getCharacterByName,
            getCharacterByPartOfName,
            process,
            setProcess,
        }
}

export default useMarvelService;

