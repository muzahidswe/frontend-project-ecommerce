import { Link } from 'react-router-dom';

import offer from '../../assets/images/offer.jpg';

const Offer = () => {
    return (
        <>
            <div className="container pb-16">
                <Link to="/">
                    <img src={offer} alt="ads" className="w-full"/>
                </Link>
            </div>
        </>
    );
}

export default Offer;