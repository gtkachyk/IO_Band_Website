import { scrollToBottom } from "./guestbook";
import { constants } from '../assets/constants.js';

export const fetchData = async (endpoints, setData, setLoading) => {
    try {
        const responses = await Promise.all(
            endpoints.map(async (endpoint) => {
                const response = await fetch(`${constants.apiLink}${endpoint}`);
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

export const postGuestBookEntry = async (user_uuid, ip, name, message, date, time, setError, setErrorMessage) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}guest_book_entries/`, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'user_uuid': user_uuid,
                'ip': ip,
                'name': name,
                'message': message,
                'date': date,
                'time': time
            })
        })
        if (!response.ok) {
            throw new Error("HTTP " + response.status + " " + response.statusText);
        }
        setError(false);
        scrollToBottom();
    }
    catch (error) {
        console.log(error);
        setErrorMessage(error);
        setError(true);
    }
}