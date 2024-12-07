const fetch_url = (): string => {
    return import.meta.env.VITE_API || ""
}

export default fetch_url