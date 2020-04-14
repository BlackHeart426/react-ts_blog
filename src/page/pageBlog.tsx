import React from "react";
import {useParams} from "react-router";
import { AvatarUser } from "../components/pageShablons/AvatarUser";
import {ReactComponent} from "*.svg";
import {CoverContent} from "../components/pageShablons/CoverContent";
import {AboutUserCard} from "../components/pageShablons/AboutUserCard";
import {LevelSubscribe} from "../components/pageShablons/LevelSubscribe";

interface ParamTypes {
    userId: string
}

export const PageBlog: React.FC = () => {
    const {userId} = useParams<ParamTypes>()
    return (
        <>
            <div className="container containerWrapper">

                <CoverContent/>

                <div className="row">
                <div className="col s3 plAvatar">
                        <AvatarUser/>
                    </div>
                    <div className="col s6">
                        <AboutUserCard/>
                    </div>
                    <div className="col s3">
                        <LevelSubscribe/>
                    </div>
                </div>
            </div>
        </>
    )
}