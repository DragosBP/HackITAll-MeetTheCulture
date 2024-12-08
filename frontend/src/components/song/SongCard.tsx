import { Box, Button } from "@mui/material"
import { SongInterface } from "../Intrefaces"
import Placeholder from "./placeholder.jpeg"

interface Props {
    song: SongInterface
}

function SongCard({
    song
}: Props) {

    return (
        <>
        <Box
            
            bgcolor={"black"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"13rem"}
            borderRadius={"0.3rem"}
            padding={"1rem"}
            position={"relative"}
            sx={{
                transition: "all 0.4s",
                "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#1c1c1c",
                },
                "&:hover .play-button": {
                    opacity: 1, // Make the button fully visible when hovering
                    transform: "translateY(0px)",
                }
            }}
        >
            <Box
                width={"100%"}
                height={"13rem"}
                overflow={"hidden"}
                borderRadius={"0.3rem"}
            >
                <img 
                    src={song.img}
                    alt={Placeholder}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0.3rem"
                    }}
                />
            </Box>
            <Box
                marginTop={"1rem"}
                lineHeight={"1"}
                textAlign={"start"}
            >
                <Box
                    fontSize={"1.2rem"}
                    color={"white"}
                >
                    {song.name}
                </Box>
                <Box
                    fontSize={"0.9rem"}
                    marginTop={"0.5rem"}
                    fontWeight={"500"}
                    color={"gray"}
                >
                    Top Songs
                </Box>
            </Box>
            <Box
                className="play-button" 
                
                position={"absolute"}
                top={"55%"}
                right={"10%"}
                sx={{
                    transform: "translateY(100px)",
                    opacity: "0",
                    transition: "all 0.4s",
                }}
            >
                <Button
                    sx={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: "50%",
                        bgcolor: "rgb(50, 233, 50)", // Play button background color
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "scale(0.95)", // Slightly smaller by default
                        minWidth: "0",

                        transition: "all 0.4s",
                        "&:hover": {
                            cursor: "pointer",
                            transform: "scale(1)"
                        }
                    }}

                    onClick={() => window.open(song.link)}
                >
                    <Box
                        width={"0"}
                        height={"0"}
                        borderLeft={"10px solid transparent"}
                        borderRight={"10px solid transparent"}
                        borderBottom={"18px solid black"}
                        marginLeft={"0.2rem"}
                        sx={{
                            transform: "rotate(90deg)", // Rotate the triangle to point right
                        }}
                    >
                    </Box>
                </Button>
            </Box>
        </Box>
        </>
    )
}

export default SongCard