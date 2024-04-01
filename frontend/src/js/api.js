import Axios from "axios";
import { useState } from 'react';


export const fetchData = async (endpoints, setData, setLoading) => {
    try {
        const responses = await Promise.all(
            endpoints.map(async (endpoint) => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok for endpoint: ${endpoint}`);
                }
                return response.json();
            })
        );
        setData(responses);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
    }
};

export const displayGuestBookEntries = () => {
    const [guestBookEntries, setGuestBookEntries] = useState([]);

    const postGuestBookEntry = (user_uuid, ip, name, message, date) => {
        Axios.post(`${import.meta.env.VITE_API_URL}guest_book_entries/`, {
            'user_uuid': user_uuid,
            'ip': ip,
            'name': name,
            'message': message,
            'date': date
        },
        {
            headers: {
                "Authorization": `AUTHORIZATION_KEY`,
                "Content-Type": 'application/json'
            }
        })
        .then(res => {
            // Add the new entry to guestBookEntries state
            setGuestBookEntries([...guestBookEntries, { id: user_uuid, name, message, date }]);
        })
        .catch(error => console.error(error))
    }

    return [guestBookEntries, setGuestBookEntries, postGuestBookEntry];
}
