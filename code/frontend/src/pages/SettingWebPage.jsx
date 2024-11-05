import NaviBar from "../components/NaviBar";
import "./SettingWebPage.css";
import "../components/Pop_up.css";
import Pop_up from "../components/Pop_up";
import SettingModal from "../components/SettingModal";
import PwModal from "../components/pwModal";
import Removal from "../components/Removal";
import React, { useState } from "react";
import Search from "../components/Search";

const SettingWebPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPwModalOpen, setIsPwModalOpen] = useState(false);
    const [isRemovalOpen, setIsRemovalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openPwModal = () => setIsPwModalOpen(true);
    const closePwModal = () => setIsPwModalOpen(false);

    const openRemoval = () => setIsRemovalOpen(true);
    const closeRemoval = () => setIsRemovalOpen(false);

    return (
        <div className="setting-web-page">
            <NaviBar />
            <section className="content">
                <div className="settings-content">
                    <div className="main-settings">
                        <div className="settings-container">
                            <div className="settings-title-wrapper">
                                <h1 className="settings-title">Settings</h1>
                            </div>
                            <div className="setting">
                                <div className="icbaseline-delete" />
                                <div className="account-management-container">
                                    <div className="account-details">
                                        <div className="account-details-row">
                                            <i className="account-management">
                                                Account Management
                                            </i>
                                            <div className="account-actions">
                                                <div className="account-actions-child" />
                                                <div className="account-action-buttons">
                                                    <div className="account-action-icons">
                                                        <img
                                                            className="iconamoonprofile-circle-fill"
                                                            loading="lazy"
                                                            alt=""
                                                            src="/iconamoonprofilecirclefill.svg"
                                                        />
                                                    </div>
                                                    <img
                                                        className="carbonpassword-icon"
                                                        loading="lazy"
                                                        alt=""
                                                        src="/carbonpassword.svg"
                                                    />
                                                    <div className="account-action-icons1">
                                                        <img
                                                            className="iconamoonprofile-circle-fill"
                                                            loading="lazy"
                                                            alt=""
                                                            src="/materialsymbolsdelete.svg"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="personal-info-container">
                                                    <div className="personal-info-details">
                                                        <span
                                                            className="personal-account"
                                                            onClick={openModal}
                                                        >
                                                            Personal Account
                                                        </span>
                                                        <div className="name-e-mail">
                                                            Name | E-mail |
                                                            personal information
                                                        </div>
                                                        {isModalOpen && (
                                                            <SettingModal
                                                                onClose={
                                                                    closeModal
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="change-password">
                                                        <span
                                                            className="chg_pw"
                                                            onClick={
                                                                openPwModal
                                                            }
                                                        >
                                                            Change Password
                                                        </span>
                                                    </div>
                                                    {isPwModalOpen && (
                                                        <PwModal
                                                            onClose={
                                                                closePwModal
                                                            }
                                                        />
                                                    )}
                                                    <div className="account-removal-container">
                                                        <div className="account-removal-details">
                                                            <div className="account-removal">
                                                                <span
                                                                    className="acc-rm"
                                                                    onClick={
                                                                        openRemoval
                                                                    }
                                                                >
                                                                    Account
                                                                    Removal
                                                                </span>
                                                            </div>
                                                            <div className="name-e-mail">
                                                                Deactivate
                                                                Deletion
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isRemovalOpen && (
                                                        <Removal
                                                            onClose={
                                                                closeRemoval
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="location-container">
                                            <div className="location-details">
                                                <i className="location">
                                                    Location
                                                </i>
                                            </div>
                                            <div className="location-icon-container">
                                                <div className="location-icon-container-child" />
                                                <img
                                                    className="iconamoonprofile-circle-fill"
                                                    loading="lazy"
                                                    alt=""
                                                    src="/magelocationfill.svg"
                                                />
                                                <div className="area-container">
                                                    <div className="area-details">
                                                        <div className="area-of-residence">
                                                            Area of residence:
                                                        </div>
                                                        <div className="dropdown-container">
                                                            <div className="dropdown-input">
                                                                <select className="dropdown residence">
                                                                    <option className="opt">
                                                                        CCDS -
                                                                        NTU
                                                                    </option>
                                                                    <option className="opt">
                                                                        Tanjong
                                                                        Hall
                                                                    </option>
                                                                    <option className="opt">
                                                                        Hall 11
                                                                        - NTU
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preferences-container">
                                            <div className="preferences-details">
                                                <div className="preferences-title-row">
                                                    <i className="activity-preferences">
                                                        Activity Preferences
                                                    </i>
                                                </div>
                                                <div className="preferences-icon-container">
                                                    <img
                                                        className="iconamoonprofile-circle-fill"
                                                        loading="lazy"
                                                        alt=""
                                                        src="/typcnpointofinterest.svg"
                                                    />
                                                    <div className="available-interests-container">
                                                        <div className="available-interests-details">
                                                            <div className="available-interests">
                                                                Available
                                                                Interests:
                                                            </div>
                                                            <div className="dropdown-container">
                                                                <div className="preference-dropdown-input">
                                                                    <select className="dropdown residence">
                                                                        <option className="opt">
                                                                            Outdoor Activities
                                                                        </option>
                                                                        <option className="opt">
                                                                            Indoor Activities
                                                                        </option>
                                                                        <option className="opt">
                                                                            Team Sports
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account-management-container-inner">
                                        <div className="separator-wrapper">
                                            <div className="separator" />
                                        </div>
                                    </div>
                                </div>
                                <div className="account-details-row">
                                    <i className="notification-settings">
                                        Notification Settings
                                    </i>
                                    <div className="notification-icon-container">
                                        <div className="notification-icon-container-child" />
                                        <img
                                            className="iconamoonprofile-circle-fill"
                                            alt=""
                                            src="/rinotificationfill.svg"
                                        />
                                        <div className="notification-details">
                                            <div className="notification-options">
                                                <div className="allow-notifications">
                                                    {/*Allow notifications*/}{" "}
                                                    <Pop_up />
                                                </div>
                                                <div className="new-groups">{`New groups | Upcoming events | E-mail `}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Search />
                    <div className="language-container">
                        <button className="language-change">
                            <div className="language-change-child" />
                            <img
                                className="vector-icon2"
                                alt=""
                                src="/vector-5.svg"
                            />
                            <Languagechoice />
                            {/*<a className="en">EN</a>*/}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Dropdown = () => {
    return (
        <select className="dropdown">
            <option>Dropdown</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </select>
    );
};

const Languagechoice = () => {
    return (
        <select className="Languagechoice">
            <option className="opt-lang">EN</option>
            <option className="opt-lang">中文</option>
            <option className="opt-lang">Malay</option>
            <option className="opt-lang">தமிழ்</option>
        </select>
    );
};

export default SettingWebPage;
