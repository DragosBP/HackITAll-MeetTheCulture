import { Box, Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import DaySection from "./DaySection";
import SongSection from "./SongSection";
import EventSection from "./EventSection";
import FoodSection from "./FoodSection";
import ForumSection from "./ForumSection";
import { useEffect } from "react";
import Background from "./assets/bg.svg"

import "./c.css"

function Learn() {
    useEffect(() => {
        // Create an intersection observer to detect when a section is in view
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add a class to trigger the fade-in animation when the section is in view
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the section is in view
        });

        sections.forEach((section) => {
            observer.observe(section);
        });

        // Cleanup observer on component unmount
        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <Box
    sx={{
        backgroundImage: `url(${Background})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundAttachment: "scroll", // Ensures the background scrolls with the content
        bgcolor: "#fdf5ea",
        height: "100%", 
        width: "100%", 
        overflow: "scroll"
    }}
>
    <Navbar isHome={false} isLearn={true} isAbout={false} />
    <Box
        position="relative"
        top="-3.1%"
        left="53rem"
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
            Recipes
        </Button>
        <Button onClick={() => document.getElementById('section-4')?.scrollIntoView({ behavior: "smooth" })} sx={{color: "black", fontSize: "1rem"}}>
            Events
        </Button>
        <Button onClick={() => document.getElementById('section-5')?.scrollIntoView({ behavior: "smooth" })} sx={{color: "black", fontSize: "1rem"}}>
            Suggest
        </Button>
    </Box>

    {/* Sections */}
    <Box id="section-1" className="fade-in-section" height={"100vh"}>
        <DaySection />
    </Box>

    <Box id="section-2" className="fade-in-section" height={"90vh"}>
        <SongSection />
    </Box>

    <Box id="section-3" className="fade-in-section" height={"90vh"}>
        <FoodSection />
    </Box>

    <Box id="section-4" className="fade-in-section" height={"90vh"}>
        <EventSection />
    </Box>

    <Box id="section-5" className="fade-in-section" height={"90vh"}>
        <ForumSection />
    </Box>
</Box>

    );
}

export default Learn;
