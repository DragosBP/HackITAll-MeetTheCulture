import { useEffect, useState } from "react";
import fetch_url from "../../providers/url.provider";
import { EventInterface } from "../Intrefaces";
import EventCard from "./EventCarsd";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftArrow from "../song/assets/Left.svg"
import RightArrow from "../song/assets/Right.svg"
import { Box } from "@mui/material";

const url = fetch_url()

function Events () {

    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<EventInterface[]>([])

    useEffect(() => {
        fetch(url + "/get-events", {
            method: "get"
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                    setEvents(data)
                })
            } else {
                console.log("Problem with fetching event")
            }
        })
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [events])

    return (
        <Box
            width={"80rem"} 
        >   
        {!isLoading ?
            <Slider
                swipeToSlide={true}
                dots={true}
                speed={500}
                infinite={true}
                centerPadding="0px"
                slidesToShow={4}
                slidesPerRow={1}
                adaptiveHeight={true}
                prevArrow={<img src={LeftArrow}/>}
                nextArrow={<img src={RightArrow}/>}
                
            >
                {
                    events.map((event, index) => (
                        <Box
                        padding={"1rem"}
                        key={index}
                        >
                            <EventCard event={event}  />
                        </Box>
                    ))
                }
            </Slider>
            :
            <>
                Loading
            </>    
        }
        </Box>
    )
}

export default Events