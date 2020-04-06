import React from "react";

export const listLevels = [
    {
        name: "1",
        cost: "50",
        description: "Access to the show ",
        active: true
    },
    {
        name: "2",
        cost: "100",
        description: "All videos",
        active: false
    },
    {
        name: "3",
        cost: "150",
        description: "Special",
        active: false
    },
]

export const LevelSubscribe: React.FC = () => {
    return (
        <div className="row ">
            <div className="col s12 m6">
                <div className="card ">
                    <div className="card-content ">
                        <p className="bold">LEVEL SUBSCRIBE</p>
                    </div>
                    <div className="card-action ">
                        {listLevels.map((item, index) => {
                            <div className="card-content ">
                                <p className="bold">{item.name}</p>
                                <p className="bold">{item.cost}</p>
                                <p className="bold">{item.description}</p>
                            </div>
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}