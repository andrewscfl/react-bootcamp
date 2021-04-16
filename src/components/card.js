import React from 'react';

function Card(props) {
    return (<div className="contact-card">
        <div class="contact-card-name">
            <h2>
                {props.name}
            </h2>
        </div>
        <div className="contact-card-phone">
            <p>
                phone: {props.phone} <br />
                website: {props.website}<br />
                email: {props.email}
            </p>
        </div>
    </div>
    );
}

export default Card;