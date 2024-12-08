import { useEffect, useState } from "react";
import fetch_url from "../../providers/url.provider";
import { EventInterface, SugestionInterface } from "../../components/Intrefaces";
import SugestionCard from "./SugestionCard";  // Import SugestionCard
import { Box, Button } from "@mui/material";
import EventAdminCard from "./EventAdminCard";

const url = fetch_url();

function AdminPage() {
    const [sugestions, setSugestions] = useState<SugestionInterface[]>([]);
    const [events, setEvents] = useState<EventInterface[]>([])
    const [onSugestion, setOnSugestion] = useState(true)

    useEffect(() => {
        const fetch_sugestions = () => {
            fetch(url + "/get-suggestion", {
                method: "get",
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
        }

        const fetch_event = () => {
            fetch(url + "/get-events", {
                method: "get",
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setEvents(data);
                        console.log(data)
                    });
                } else {
                    console.log("Problem with fetching suggestions");
                }
            })
            .catch((error) => {
                console.log("Error fetching suggestions:", error);
            });
        }

        fetch_sugestions()
        fetch_event()
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
                method: "get",
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setSugestions(data);
                        console.log(data)
                    });
                } else {
                    console.log("Problem with fetching suggestions");
                }
            })
            .catch((error) => {
                console.log("Error fetching suggestions:", error);
            }).then(() => {
                fetch(url + "/get-events", {
                    method: "get",
                })
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setEvents(data);
                            });
                        } else {
                            console.log("Problem with fetching suggestions");
                        }
                    })
                    .catch((error) => {
                        console.log("Error fetching suggestions:", error);
                    });
            });
        })
    }

    const handleDelete = (id: number) => {
        fetch(url + "/discard-event", {
            method: "post",
            headers: {
                "Content-Type": "application/json" // Ensure the server expects JSON data
            },
            body: JSON.stringify({
                id: id
            })
        }).then(() => {
            fetch(url + "/get-events", {
                method: "get",
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            setEvents(data);
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
        <>
        <Button
            onClick={() => {
                setOnSugestion(!onSugestion)
            }}
        >
            {`Switch to ${onSugestion ? "evets" : "suggestions"}`}
        </Button>
        {
            onSugestion ? 
            <>
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
            </> : <>
            <Box sx={{ padding: "1rem" }}>
                {events.length > 0 ? (
                    <Box>
                        {/* Map through all suggestions and render each SugestionCard */}
                        {events.map((event, index) => (
                            <EventAdminCard event={event} key={index} fun={handleDelete}/>
                        ))}
                    </Box>
                ) : (
                    <>Loading...</>
                )}
            </Box>
            </>
        }
        </>
    );
}

export default AdminPage;
