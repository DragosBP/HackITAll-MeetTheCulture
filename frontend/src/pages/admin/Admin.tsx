import { useEffect } from "react"
import fetch_url from "../../providers/url.provider"

const url = fetch_url

function AdminPage() {

    useEffect(() => {
        fetch(url + "/get-suggestion", {
            method: "get"
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                })
            } else {
                console.log("Problem with fetching event")
            }
        })
    }, [])

    return(
        <>
        </>
    )
}

export default AdminPage