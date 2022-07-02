import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';

const SingleComicLayout = ({data: {title, description, pageCount, language, thumbnail, price}}) => {
    
    return (
        <div className="single-item">
            <Helmet>
                <meta
                    name="description"
                    content={`Comic: "${title}"`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-item__img-comic"/>
            <div className="single-item__info">
                <h2 className="single-item__name">{title}</h2>
                <p className="single-item__descr">{description}</p>
                <p className="single-item__descr">{pageCount}</p>
                <p className="single-item__descr">{`Language: ${language}`}</p>
                <div className="single-item__price">{price}</div>
            </div>
            <Link to='/comics' className="single-item__back">Back to all comics</Link>
        </div>
    )
}

export default SingleComicLayout;