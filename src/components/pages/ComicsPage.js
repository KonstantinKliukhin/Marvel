import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundery from "../errorBoundary/ErrorBoundery";
import {Helmet} from 'react-helmet';


const ComicsPage = () => {
    return (
        <>  
            <Helmet>
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ErrorBoundery>
                <ComicsList/>
            </ErrorBoundery>
        </>
    )
}

export default ComicsPage;