import { Box } from "@mui/system";
import SongCard from "./SongCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { SongInterface } from "../Intrefaces";

function SongList() {
    const [songs, setSongs] = useState<SongInterface[]>([]);

    useEffect(() => {
        const song = {
            name: "Costel Biju",
            artist: "Al mai mare campion",
            country: "Tara valorosilor",
            link: "https://www.youtube.com",
        };
    

        const fetchSongs = () => {
            setSongs([song, song, song, song, song])
        }

        fetchSongs()
    }, [])

    return (
        <Box
            width={"48rem"}
        >
            {songs ? 
                <Slider
                swipeToSlide={true}
                dots={true}
                speed={500}
                centerPadding="0px"
                slidesToShow={3}
                slidesToScroll={1}
                adaptiveHeight={true}
            >
                {songs.map((song, index) => (
                    <Box
                        padding={"1rem"}
                    >
                        <SongCard song={song} key={index} />
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
