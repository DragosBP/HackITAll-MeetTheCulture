import { Box, Button} from "@mui/material";
import { EventInterface } from "../../components/Intrefaces";

interface Props {
    event: EventInterface;
    fun: (id: number) => void
}

function EventAdminCard({ event, fun }: Props) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                borderBottom: "1px solid #ddd",
            }}
        >
            <Box sx={{ flex: 1 }}>{event.name}</Box>
            <Box sx={{ flex: 1 }}>{event.link}</Box>
            <Button onClick={() => fun(event.id)}>Remove</Button>
        </Box>
    );
}

export default EventAdminCard;
