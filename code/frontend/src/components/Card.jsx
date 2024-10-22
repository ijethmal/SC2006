import React from "react";
import "./Card.css";
function Card(props) {
    // return(
    //     <div className='card'>
    //         <img className="card-image" src={props.image} alt="event-picture" ></img>
    //         <h2 className="card-title">{props.title}</h2>
    //         <p>{props.date}</p>
    //         <p>{props.time}</p>
    //         <p className='card-description'>{props.description}</p>
    //     </div>
    // )

    return (
        <div className="card">
            <img
                className="card-image"
                src="https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg"
                alt="event-picture"
            ></img>
            <div className="card-info">
                <h2 className="card-title">Cooking</h2>
                <p>20-10-2024</p>
                <p className="card-description">
                    Hello I am MrBeast I donate money for money for money Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit.
                    Dignissimos neque quod voluptatum fugiat libero nobis
                    officiis veniam cumque repudiandae consectetur perspiciatis
                    nihil temporibus veritatis, amet rem similique
                    necessitatibus earum? Consectetur!
                </p>
            </div>
        </div>
    );
}

export default Card;
