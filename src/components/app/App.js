import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { lazy, Suspense } from 'react';


import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPaig'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/singlePage/SinglePage'));
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout'));
const SingleCharLayout = lazy(() => import('../pages/SingleCharLayout'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="comics" element={<ComicsPage/>}/>
                            <Route 
                                path="comics/:id" 
                                element={<SinglePage 
                                            Component={SingleComicLayout} 
                                            dataType='comic'/>}/>
                            <Route 
                                path="characters/:id" 
                                element={<SinglePage 
                                            Component={SingleCharLayout} 
                                            dataType='char'/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;