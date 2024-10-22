import NaviBar from "../components/NaviBar";
import "./SettingWebPage.css";

const SettingWebPage = () => {
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
                                                        <div className="personal-account">
                                                            Personal Account
                                                        </div>
                                                        <div className="name-e-mail">
                                                            Name | E-mail |
                                                            personal information
                                                        </div>
                                                    </div>
                                                    <div className="change-password">
                                                        Change Password
                                                    </div>
                                                    <div className="account-removal-container">
                                                        <div className="account-removal-details">
                                                            <div className="account-removal">
                                                                Account Removal
                                                            </div>
                                                            <div className="name-e-mail">
                                                                Deactivate |
                                                                Deletion
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                                <Dropdown />
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
                                                                    <Dropdown />
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
                                                    Allow notifications
                                                </div>
                                                <div className="new-groups">{`New groups | Upcoming events | E-mail `}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="language-container">
                        <button className="language-change">
                            <div className="language-change-child" />
                            <img
                                className="vector-icon2"
                                alt=""
                                src="/vector-5.svg"
                            />
                            <a className="en">EN</a>
                        </button>
                        <img
                            className="risearch-line-icon"
                            loading="lazy"
                            alt=""
                            src="/risearchline.svg"
                        />
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

export default SettingWebPage;
