export const getVans = async () =>
    {
        let response: Response = await fetch("/api/vans");

        if (!response.ok) {
            throw {
                message: "Failed to fetch vans", 
                statusText: response.statusText,
                status: response.status
            }
        }
        
        return await response.json();
    };