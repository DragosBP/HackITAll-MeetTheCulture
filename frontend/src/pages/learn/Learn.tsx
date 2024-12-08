import { Box, Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import DaySection from "./DaySection";
import SongSection from "./SongSection";
import EventSection from "./EventSection";
import FoodSection from "./FoodSection";

function Learn() {
    return (
        <Box
            bgcolor={"#fdf5ea"}
            height={"100%"}
            width={"100%"}
            overflow={"scroll"}
        >
            <Navbar 
                isHome={false}
                isLearn={true}
                isAbout={false}
            />
            <Box
                position="fixed"
                top={"2.7%"}
                right="1rem"
                color={"black"}
                fontSize={"5rem"}
                width="50%"
                bgcolor="rgba(180, 197, 228, 0.6)"
                borderRadius="40px"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                paddingX={"1%"}
            >
                <Button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: "smooth" })} sx={{color: "black", fontSize: "1rem"}}>
                    Facts of the day
                </Button>
                <Button onClick={() => document.getElementById('section-2')?.scrollIntoView({ behavior: "smooth" })} sx={{color: "black", fontSize: "1rem"}}>
                    Songs
                </Button>
                <Button onClick={() => document.getElementById('section-3')?.scrollIntoView({ behavior: "smooth" })} sx={{color: "black", fontSize: "1rem"}}>
                    Recipies
                </Button>
                <Button onClick={() => document.getElementById('section-4')?.scrollIntoView({ behavior: "smooth" })} sx={{color: "black", fontSize: "1rem"}}>
                    Events
                </Button>
            </Box>

            {/* Sections */}
            
            <Box id="section-1" height={"100vh"}>
                <DaySection />
            </Box>

            <Box id="section-2" height={"90vh"}>
                <SongSection />
            </Box>

            <Box id="section-3" height={"90vh"}>
                <FoodSection />
            </Box>

            <Box id="section-4" height={"90vh"}>
                <EventSection />
            </Box>
        </Box>

    );
}

export default Learn;
