import React, { useEffect, useState, useRef } from 'react';
import '../../styles/root/guestbook.scss';
import { v4 as uuidv4 } from 'uuid';
import { fetchData, postGuestBookEntry } from '../../js/api';
import { scrollToBottom, generateFormattedMessage } from "../../js/guestbook";

function GuestBook () {
    // State variables
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [public_ip, setIPAddress] = useState('');

    // Generate uuid
    const uuidRef = useRef(uuidv4());

    // Get data from api
    useEffect(() => {
        fetchData(['guest_book_entries/'], setData, setLoading);
    }, []);

    // Scroll textarea to bottom
    useEffect(() => {
        scrollToBottom();
    }, []);

    // Get client public ip
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => setIPAddress(data.ip))
          .catch(error => console.log(error))
    }, []);

    // Check if an error occurred
    useEffect(() => {
        if (error) {
            setError(false);
            alert(errorMessage);
            setErrorMessage('');
        }
    }, [error]);

    // Function for submitting a guestbook post
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.elements.name.value;
        const message = event.target.elements.message.value;
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        try {
            await postGuestBookEntry(uuidRef.current, public_ip, name, message, date, time, setError, setErrorMessage);
            fetchData(['guest_book_entries/'], setData, setLoading);
            event.target.reset();
        }
        catch (error){
            console.error('Error submitting guest book entry: ', error);
        }
    }

    if (loading) {
        return (<>Loading...</>);
    }

    // Process data from api
    var guest_book_posts = data[0];
    var guest_book_display = "";
    const guest_book_div_width = parseInt(window.getComputedStyle(document.getElementsByClassName("offensive-row-1-content-container")[0]).getPropertyValue('width'), 10);

    for (var i = 0; i < guest_book_posts.length; i++){
        guest_book_display += generateFormattedMessage(guest_book_posts[i], guest_book_div_width);
    }

    return (
        <>
            <textarea className="guestbook-display" id="guestbook-display-textarea" readOnly value={guest_book_display}></textarea>
            <form className="guestbook-form" onSubmit={handleSubmit}>
                <input className="guestbook-name" type="text" id="name" name="name" maxLength="50" placeholder="Name" required />
                <textarea className="guestbook-message" id="message" name="message" maxLength="400" placeholder="Message" required />
                <button className="guestbook-submit" type="submit">Submit</button>
            </form>
        </>
    );
}

export default GuestBook;