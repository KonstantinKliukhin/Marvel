import { Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';


const SingleCharLayout = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="single-item">
            <Helmet>
                <meta
                    name="description"
                    content={`Information about comics charapter: ${name}`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-item__img-char"/>
            <div className="single-item__info">
                <h2 className="single-item__name">{name}</h2>
                <p className="single-item__descr">{description}</p>
            </div>
            <Link to='/' className="single-item__back">Back to all comics</Link>
        </div>
    )
}

export default SingleCharLayout;