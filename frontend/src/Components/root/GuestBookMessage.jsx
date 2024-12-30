import '../../styles/components/guestbook_message.scss';

function GuestBookMessage({ post }) {
  return (
    <>
      <div className="first-line">
        <div className="greeting">
          Dearest Band,
        </div>
        <div className="date">
          {post.date} at {post.time}
        </div>
      </div>
      <div className="message">
        <br></br>
        {post.message}
        <br></br>
        <br></br>
        Sincerely,
        <br></br>
        {post.name}
      </div>
    </>
  );
}

export default GuestBookMessage;
