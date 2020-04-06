import React from "react";
import {useParams} from "react-router";
import { AvatarUser } from "../components/AvatarUser";
import {ReactComponent} from "*.svg";
import {CoverContent} from "../components/CoverContent";
import {AboutUserCard} from "../components/AboutUserCard";
import {LevelSubscribe} from "../components/LevelSubscribe";

interface ParamTypes {
    userId: string
}

export const PageBlog: React.FC = () => {
    const {userId} = useParams<ParamTypes>()
    return (
        <>
            <CoverContent/>
            <AvatarUser/>
            <AboutUserCard/>
            <LevelSubscribe/>
        </>
    )
}