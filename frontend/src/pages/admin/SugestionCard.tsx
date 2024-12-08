import { Box, Button} from "@mui/material";
import { SugestionInterface } from "../../components/Intrefaces";

interface Props {
    sugestion: SugestionInterface;
    fun: (answer: boolean, id: number) => void
}

function SugestionCard({ sugestion, fun }: Props) {
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
            <Box sx={{ flex: 1 }}>{sugestion.name}</Box>
            <Box sx={{ flex: 2 }}>{sugestion.description}</Box>
            <Box sx={{ flex: 1 }}>{sugestion.link}</Box>
            <Button onClick={() => fun(true, sugestion.id)}>Approve</Button>
            <Button onClick={() => fun(false, sugestion.id)}>Reject</Button>
        </Box>
    );
}

export default SugestionCard;
