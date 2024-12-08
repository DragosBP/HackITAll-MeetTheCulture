import { useEffect, useState } from "react"
import fetch_url from "../../providers/url.provider"
import { FoodInterface } from "../Intrefaces"
import FoodCard from "./FoodCard"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RightArrow from "../song/assets/Right.svg"
import LeftArrow from "../song/assets/Left.svg"
import { Box } from "@mui/material"


const url = fetch_url()

function Food() {

    const [foods, setFoods] = useState<FoodInterface[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(url + "/get-cooking-recipes", {
            method: "get"
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                    setFoods(data)
                })
            } else {
                console.log("Problem with fetching food")
            }
        })
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [foods])

    return (
        <Box
            width={"50rem"} 
        >   
        {!isLoading ?
            <Slider
                swipeToSlide={true}
                dots={true}
                speed={500}
                infinite={true}
                centerPadding="0px"
                slidesToShow={2}
                slidesPerRow={2}
                adaptiveHeight={true}
                autoplay={true}
                autoplaySpeed={2000}
                prevArrow={<img src={LeftArrow}/>}
                nextArrow={<img src={RightArrow}/>}
                
            >
                {
                    foods.map((food, index) => (
                        <Box
                        padding={"1rem"}
                        key={index}
                        >
                            <FoodCard food={food}  />
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


export default Food