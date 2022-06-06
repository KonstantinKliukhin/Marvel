// const privateKey = 'da5897600198d6967700885d830244eebf1f9597';
class MarvelService {
    #apiBase = 'https://gateway.marvel.com:443/v1/public/';
    #apiKey = 'apikey=2d5abc4b009c726723c13a6c55b3209c';
    #baseOffset = 210;

    #NumberOf

    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`) ;
        }
    
        return await res.json();
    };

    getAllCharacters = async (offset = 0) => {
        const res = await this.getResource(`${this.#apiBase}characters?limit=9&offset=${this.#baseOffset + offset}&${this.#apiKey}`);
        return res.data.results.map(this.#transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`);
        return this.#transformCharacter(res.data.results[0]);
    }

    #transformCharacter = (char) => {
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
}

export default MarvelService;

