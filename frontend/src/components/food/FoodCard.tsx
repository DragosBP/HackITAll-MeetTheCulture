import { Box, Button} from "@mui/material";
import { FoodInterface } from "../Intrefaces";

interface Props {
    food: FoodInterface
}

function FoodCard({
    food
}: Props) {
    return (
        <>
            <Box
                bgcolor={"#D0ABA0"} // Card background
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                width={"17rem"}
                height={"16rem"} // Increased height for better proportions
                borderRadius={"0.3rem"}
                padding={"0.6rem"}
                position={"relative"}
                boxShadow={"0 4px 8px rgba(0, 0, 0, 0.2)"} // Shadow for a card effect
                overflow={"hidden"}
            >
                {/* Image Section */}
                <Box
                    width={"100%"} // Image occupies 85% of card width
                    overflow={"hidden"}
                    borderRadius={"0.5rem"} // Slightly rounded corners
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    boxShadow={"0 2px 5px rgba(0, 0, 0, 0.15)"} // Shadow for image
                >
                    <img
                        src={food.img}
                        alt="Food Image"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Ensures image fits well
                            borderRadius: "0.5rem", // Matches the container's border radius
                        }}
                    />
                </Box>
    
                {/* Text Section */}
                <Box
                    marginTop={"1rem"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={"1rem"}
                    width={"90%"} // Aligns with the image width
                    textAlign={"center"}
                >
                    <Box
                        fontSize={"1.5rem"}
                        fontWeight={"600"}
                        color={"#333"} // Slightly darker text for contrast
                    >
                        {food.food_type}
                    </Box>
                    <Button
                        onClick={() => {
                            window.open(food.link)
                        }}
                        sx={{
                            fontSize: "1.3rem",
                            fontWeight: "600",
                            color: "#333"
                        }}
                    >
                        To page
                    </Button>
                </Box>
            </Box>
        </>
    );
    
}

export default FoodCard