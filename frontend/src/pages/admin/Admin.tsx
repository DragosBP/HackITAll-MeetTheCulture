import { useEffect, useState } from "react";
import fetch_url from "../../providers/url.provider";
import { SugestionInterface } from "../../components/Intrefaces";
import SugestionCard from "./SugestionCard";  // Import SugestionCard
import { Box } from "@mui/material";

const url = fetch_url();

function AdminPage() {
    const [sugestions, setSugestions] = useState<SugestionInterface[]>([]);

    useEffect(() => {
        fetch(url + "/get-suggestion", {
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setSugestions(data);
                    });
                } else {
                    console.log("Problem with fetching suggestions");
                }
            })
            .catch((error) => {
                console.log("Error fetching suggestions:", error);
            });
    }, []);

    const sendApprove = (answer: boolean, id: number) => {
        fetch(url + "/approve-suggestion", {
            method: "post",
            headers: {
                "Content-Type": "application/json" // Ensure the server expects JSON data
            },
            body: JSON.stringify({
                approve: answer === true ? "True" : false,
                id: id
            })
        }).then(() => {
            fetch(url + "/get-suggestion", {
                method: "GET",
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            setSugestions(data);
                        });
                    } else {
                        console.log("Problem with fetching suggestions");
                    }
                })
                .catch((error) => {
                    console.log("Error fetching suggestions:", error);
                });
        })
    }

    return (
        <Box sx={{ padding: "1rem" }}>
            {sugestions.length > 0 ? (
                <Box>
                    {/* Map through all suggestions and render each SugestionCard */}
                    {sugestions.map((sugestion, index) => (
                        <SugestionCard key={index} sugestion={sugestion} fun={sendApprove} />
                    ))}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    );
}

export default AdminPage;
