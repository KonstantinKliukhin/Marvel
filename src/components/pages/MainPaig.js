import { useState } from "react";
import ErrorBoundery from "../errorBoundary/ErrorBoundery";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import CharSearchForm from "../charSearchForm/CharSearchForm";
import { Helmet } from 'react-helmet';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <Helmet>
            <meta
                name="description"
                content="Comics and comics characters"
                />
            <title>Marvel information</title>
            </Helmet>
            <ErrorBoundery>
                <RandomChar/>
            </ErrorBoundery>
            <div className="char__content">
                <ErrorBoundery>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundery>
                <div style={{position: 'sticky', top: '10px'}}>
                    <ErrorBoundery>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundery>
                    <ErrorBoundery>
                        <CharSearchForm/>
                    </ErrorBoundery>
                </div>
            </div>
            {/* <img className="bg-decoration" src={decoration} alt="vision"/> */}
        </>

    );
}

export default MainPage;