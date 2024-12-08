import { useEffect, useState } from "react"
import fetch_url from "../../providers/url.provider"
import { SpecialDayInterface } from "../Intrefaces"
import { Box } from "@mui/material"

const url = fetch_url()



function SpecialDay() {

    const [day, setDay] = useState<SpecialDayInterface>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(url + "/daily-holiday", {
            method: "get"
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                    setDay(data)
                })
            } else {
                console.log("Problem with fetching day special")
            }
        })
    }, [])

    useEffect(() => {
        setLoading(true)
    }, [day])

    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
        >
            {
                day ? 
                <>
                    <Box>
                        Today is {day.date}
                    </Box>
                    <Box
                        width={"40%"}
                    >
                        {day.description}
                    </Box>
                </>
                :
                <>
                    Loading
                </>
            }
        </Box>
    )
}

export default SpecialDay