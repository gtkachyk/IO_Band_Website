export function scrollToBottom() {
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
        if (i >= allowedIterations) {
            retryAttempts++;
            if (setToBottom == true || retryAttempts >= allowedAttempts){ // No more attempts
                window.clearInterval(interval);
            }
            else {
                i = 0;
            }
        }
    }, 100);
};
