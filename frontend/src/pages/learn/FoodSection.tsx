import { Box } from "@mui/material"
import Food from "../../components/food/Food"

function FoodSection() {
    return(
        <Box 
            color={"black"}
            paddingTop={"5%"}
            display={"flex"}
            flexDirection={"row"}
            width={"100%"}
            height={"100%"}

        >
            <Box
                width={"100%"}
                height={"100%"}
                fontSize={"3.5rem"}
                marginTop={"10%"}
            >
                Delinquish in some foreign delicacies!
            </Box>
            <Box
                width={"100%"}
                height={"100%"}
            >
                <Food/>
            </Box>
        </Box>
    )
}

export default FoodSection