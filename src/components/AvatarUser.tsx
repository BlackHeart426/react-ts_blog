import React from "react";

export const AvatarUser: React.FC = () => {
    return (
        <div className="row ">
            <div className="col s12 m7">
                <div className="card avatarCard_user">
                    <div className="card-image">
                        <img src="https://images.boosty.to/user/9647/avatar?change_time=1561378020&croped=1&mh=560&mw=450"/>
                            {/*<span className="card-title">Card Title</span>*/}
                    </div>
                    <div className="card-content avatarCard_user description">
                        <p className="bold">42</p>
                        <p>Subscribers</p>
                    </div>
                    <div className="card-action">
                        <a className="waves-effect btn waves-light white black-text avatarCard_user followed bold">
                            <i className="material-icons left">account_box</i>
                            Followed
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}