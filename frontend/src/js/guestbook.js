export function scrollToBottom() {
    console.log("scrollToBottom() called");
    var retryAttempts = 0;
    const allowedAttempts = 5;
    var i = 0;
    const allowedIterations = 5;
    let interval = window.setInterval(function() {
        var textarea = document.getElementById('guestbook-display-textarea');
        var setToBottom = false;
        if (textarea != null) {
            textarea.scrollTop = textarea.scrollHeight;
            setToBottom = true;
        }
        i++;
        console.log("Forcing scrollbar down for " + (5 - i) + " more iterations");
        if (i >= allowedIterations) {
            retryAttempts++;
            if (setToBottom == true || retryAttempts >= allowedAttempts){ // No more attempts
                window.clearInterval(interval);
            }
            else {
                console.log("Running scrollToBottom() again, retryAttempts = " + retryAttempts + "/" + allowedAttempts);
                i = 0;
            }
        }
    }, 100);
};
