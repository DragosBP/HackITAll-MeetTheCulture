import { Box } from "@mui/system";
import SongCard from "./SongCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { SongInterface } from "../Intrefaces";
import fetch_url from "../../providers/url.provider";
import RightArrow from "./assets/Right.svg"
import LeftArrow from "./assets/Left.svg"

const url = fetch_url()

function SongList() {
    const [songs, setSongs] = useState<SongInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        
        let isFetched = false;

        const func = async () => {

            if (isFetched)
                return

            const response =  await fetch(url + "/music", {
                method: "get"
            })

            if (response.status === 200) {
                response.json().then((data) => {
                    setSongs(data)
                })
            } else {
                console.log("Problem with fetching songs")
            }
        }

        func()

        return () => {
            isFetched = true; 
        };
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [songs])

    return (
        <Box
            width={"48rem"}
        >
            {!isLoading ? 
                <Slider
                swipeToSlide={true}
                dots={true}
                speed={500}
                centerPadding="0px"
                slidesToShow={3}
                slidesToScroll={1}
                adaptiveHeight={true}
                prevArrow={<img src={LeftArrow}/>}
                nextArrow={<img src={RightArrow}/>}
            >
                {songs.map((song, index) => (
                    <Box
                        padding={"1rem"}
                        key={index}
                    >
                        <SongCard song={song}  />
                    </Box>
                ))}
            </Slider>
            :
            <>
                Loading
            </>
            }
        </Box>
    );
}

export default SongList;
