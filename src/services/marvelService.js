// const privateKey = 'da5897600198d6967700885d830244eebf1f9597';
import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2d5abc4b009c726723c13a6c55b3209c';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = 0) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${_baseOffset + offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
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
        price: comic.prices[0].price,
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        detailUrl: comic.urls[0].url,
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

    return {loading, error, getAllCharacters, getCharacter, clearError, getComic, getAllComics}
}

export default useMarvelService;

