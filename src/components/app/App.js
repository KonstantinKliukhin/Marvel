import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from "../errorBoundary/ErrorBoundery";
import SingleComic from "../singleComic/SingleComic";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";


import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <AppBanner/>
            <main>
                {/* <ErrorBoundery>
                    <ComicsList/>
                </ErrorBoundery> */}
                <ErrorBoundery>
                    <RandomChar/>
                </ErrorBoundery>
                <div className="char__content">
                    <ErrorBoundery>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundery>
                    <ErrorBoundery>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundery>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;