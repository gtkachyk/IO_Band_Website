export function scrollToBottom(){
    var i = 0;
    let interval = window.setInterval(function() {
        var elem = document.getElementById('guestbook-display-textarea');
        elem.scrollTop = elem.scrollHeight;
        i++;
        if (i >= 10){
            window.clearInterval(interval);
        }
    }, 1000);
};

scrollToBottom();