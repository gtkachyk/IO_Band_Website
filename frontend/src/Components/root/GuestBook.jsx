import React, { useEffect, useState, useRef } from 'react';
import '../../styles/components/guestbook.scss';
import { v4 as uuidv4 } from 'uuid';
import { fetchData, postGuestBookEntry } from '../../js/api';
import GuestBookMessage from './GuestBookMessage';
import GuestBookDivider from './GuestBookDivider';

function GuestBook() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [public_ip, setIPAddress] = useState('');
  const uuidRef = useRef(uuidv4());
  const messageDisplayRef = useRef(null);

  useEffect(() => {
    fetchData(['guest_book_entries/'], setData, setLoading);
  }, []);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (error) {
      setError(false);
      alert(errorMessage);
      setErrorMessage('');
    }
  }, [error]);

  // Scroll to the bottom of the message display area when messages load
  useEffect(() => {
    if (messageDisplayRef.current) {
      messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const message = event.target.elements.message.value;
    const date = new Date().toLocaleDateString('en-CA');
    const time = new Date().toLocaleTimeString('en-CA');
    try {
      await postGuestBookEntry(uuidRef.current, public_ip, name, message, date, time, setError, setErrorMessage);
      fetchData(['guest_book_entries/'], setData, setLoading);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting guest book entry: ', error);
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  const guest_book_posts = data[0] || [];

  return (
    <>
      <div className="guestbook-container">
        <div className="message-display-area" id="message-display-area" ref={messageDisplayRef}>
          {guest_book_posts.length > 0 ? (
            guest_book_posts.map((post, index) => (
              <React.Fragment key={index}>
                <GuestBookMessage post={post} />
                {index < guest_book_posts.length - 1 && <GuestBookDivider />}
              </React.Fragment>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>

        <form className="guestbook-form" onSubmit={handleSubmit}>
          <input className="guestbook-name" type="text" id="name" name="name" maxLength="50" placeholder="Name" required />
          <textarea className="guestbook-message" id="message" name="message" maxLength="400" placeholder="Message" required />
          <button className="guestbook-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default GuestBook;
