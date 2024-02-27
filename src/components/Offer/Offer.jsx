import React from "react";
import offer from '../../assets/images/offer.jpg';
import { Link } from 'react-router-dom';

const Offer = () => {
    return (
        <>
            <div className="container pb-16">
                <Link to="/">
                    <img src={offer} alt="ads" class="w-full"/>
                </Link>
            </div>
        </>
    );
}

export default Offer;