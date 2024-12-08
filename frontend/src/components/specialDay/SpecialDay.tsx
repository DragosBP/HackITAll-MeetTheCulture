import { useEffect, useState } from "react"
import fetch_url from "../../providers/url.provider"
import { SpecialDayInterface } from "../Intrefaces"

const url = fetch_url()



function SpecialDay() {

    const [day, setDay] = useState<SpecialDayInterface>()

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


    return (
        <>
        </>
    )
}

export default SpecialDay