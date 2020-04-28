import Carousel from 'react-bootstrap/Carousel'
import {useState} from "react";
import React from "react";
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

export function CarouselBootstrap() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/homeImage%2Fdrawing.n8kYV.jpg?alt=media&token=9733cd60-5f33-4162-9414-a8484f27d886"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/homeImage%2Fmusic.2J2i6.jpg?alt=media&token=e9801e7a-29e9-414c-9680-04006b07cb96"
                    alt="Second slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/homeImage%2Ftraining.3BZNg.jpg?alt=media&token=709cac4b-87e8-49f1-9646-896e5a0c880a"
                    alt="Third slide"
                />

            </Carousel.Item>
        </Carousel>
    );
}
