import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Poster.css";
import "./Card.css";
import Card from "./Card";
import Modal from "./Modal";

const Poster = ({ className = "" }) => {
    const [openModal, setOpenModal] = useState(false);
    const [cards, setCards] = useState([<Card key={0} />]);

    // const addCard = () => {
    //     setCards([...cards, <Card key={cards.length} />]);
    // };

    return (
        <div className={`poster ${className}`}>
            <div className="group-page-bg" />
            <div className="group-interests-near-you-wrapper">
                <div className="group-interests-near">
                    Group interests near you 👐
                </div>
            </div>
            <div className="scroll-container">
                {cards.map((card, index) => (
                    <React.Fragment key={index}>{card}</React.Fragment>
                ))}
            </div>
            {/* <div className="create-group-button-wrapper">
                <div className="create-group-button">
                    <div className="create-group-button-child" />
                    <div className="create-new-group">Create new group</div>
                </div>
            </div> */}

            <button
                className="button"
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                <h3>Create Event 🔥🔥🔥</h3>
            </button>
            {openModal && <Modal closeModal={setOpenModal}/>}
        </div>
    );
};

Poster.propTypes = {
    className: PropTypes.string,
};

export default Poster;
