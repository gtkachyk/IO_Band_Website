
// Ensure guestbook display is always scrolled to the bottom
try{
    document.getElementById("guestbook-display-textarea").scrollTop = document.getElementById("guestbook-display-textarea").scrollHeight;
}
catch (error){
    console.error("Error moving guestbook-display-textarea scrollbar to bottom: " + error);
}