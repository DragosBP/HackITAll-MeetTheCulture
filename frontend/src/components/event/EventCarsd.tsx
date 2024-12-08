import { Box } from "@mui/material";
import { EventInterface } from "../Intrefaces"

interface Props {
    event: EventInterface
}


function EventCard({
    event
}: Props) {
    return (
        <Box
          sx={{
            width: "15rem",
            height: "20rem",
            position: "relative",
            borderRadius: "0.5rem",
            overflow: "hidden",
            transition: "transform 0.8s",
            "&:hover .text": {
              transform: "scale(1.05)",
            },
          }}
        >
          {/* Background Image */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${event.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "absolute",
              zIndex: 1,
            }}
          />
    
          {/* Colored Box with Text */}
          <Box
            className="text"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
              padding: "1rem",
              zIndex: 2,
              color: "white",
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
            onClick={() => window.open(event.link, "_blank")}
          >
            {event.name}
          </Box>
        </Box>
      );
}

export default EventCard