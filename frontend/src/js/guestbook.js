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

export function generateFormattedMessage(post, containerWidth) {
    // Calculate length of divider
    const dividerDashes = Math.floor(containerWidth / 6.6) - 1;

    // Generate post divider
    var postDivider = "";
    for(var i = 0; i < dividerDashes; i++) {
        postDivider += "-";
    }
    postDivider += "\n"

    // Calculate spaces in greeting line
    const greetingLineSpaces = Math.floor(containerWidth / 6.2) - 1;

    // Generate greeting line
    var greetingLine = "Dearest band,";
    for(var i = 0; i < greetingLineSpaces; i++) {
        greetingLine += " ";
    }
    var greetingLine = greetingLine + post.date + " at " + post.time + "\n\n";

    const postBody = post.message + "\n\n";
    const endLine = "Sincerely, \n" + post.name + "\n";
    return postDivider + greetingLine + postBody + endLine;
};
