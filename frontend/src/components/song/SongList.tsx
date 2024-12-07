import SongCard from "./SongCard"

function SongList() {
    const song = {
        name: "Costel Biju",
        artsist: "Al mai mare campion",
        country: "Tara valorosilor",
        link: "https://youtube.com",
    }

    return (
        <>
            <SongCard
                song={song}
            />
        </>
    )
}

export default SongList