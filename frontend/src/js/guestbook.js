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

export function generateFormattedMessage(post, charactersPerLine, spaces) {
    // Generate post divider
    var postDivider = "";
    for (var i = 0; i < charactersPerLine; i++) {
        postDivider += "-";
    }
    postDivider += "\n"

    // Generate greeting line
    var greetingLine = "Dearest band,";
    for (var i = 0; i < spaces; i++) {
        greetingLine += " ";
    }
    var greetingLine = greetingLine + post.date + " at " + post.time + "\n\n";

    const postBody = post.message + "\n\n";
    const endLine = "Sincerely, \n" + post.name + "\n";
    return postDivider + greetingLine + postBody + endLine;
};

// Taken from https://stackoverflow.com/a/45252226
/** @type {HTMLTextAreaElement} */
var _buffer;

/**
* Returns the number of lines in a textarea, including wrapped lines.
*
* __NOTE__:
* [textarea] should have an integer line height to avoid rounding errors.
*/
export function countLines(textarea) {
    if (_buffer == null) {
        _buffer = document.createElement('textarea');
        _buffer.style.border = 'none';
        _buffer.style.height = '0';
        _buffer.style.overflow = 'hidden';
        _buffer.style.padding = '0';
        _buffer.style.position = 'absolute';
        _buffer.style.left = '0';
        _buffer.style.top = '0';
        _buffer.style.zIndex = '-1';
        document.body.appendChild(_buffer);
    }

    var cs = window.getComputedStyle(textarea);
    var pl = parseInt(cs.paddingLeft);
    var pr = parseInt(cs.paddingRight);
    var lh = parseInt(cs.lineHeight);

    // [cs.lineHeight] may return 'normal', which means line height = font size.
    if (isNaN(lh)) lh = parseInt(cs.fontSize);

    // Copy content width.
    _buffer.style.width = (textarea.clientWidth - pl - pr) + 'px';

    // Copy text properties.
    _buffer.style.font = cs.font;
    _buffer.style.letterSpacing = cs.letterSpacing;
    _buffer.style.whiteSpace = cs.whiteSpace;
    _buffer.style.wordBreak = cs.wordBreak;
    _buffer.style.wordSpacing = cs.wordSpacing;
    _buffer.style.wordWrap = cs.wordWrap;

    // Copy value.
    _buffer.value = textarea.value;

    var result = Math.floor(_buffer.scrollHeight / lh);
    if (result == 0) result = 1;
    return result;
}
