/**
 * Handles the behavior of the AlbumPlayer component
 * Code adapted from https://codepen.io/craigstroman/pen/aOyRYx
 *
 **/
var audioPlayer = function () {
  "use strict";
  
  // Private variables
  var currentTrack = null;
  var elements = {
    audio: document.getElementById("audio"),
    playerButtons: {
      largeToggleBtn: document.querySelector(".large-toggle-btn"),
      nextTrackBtn: document.querySelector(".next-track-btn"),
      previousTrackBtn: document.querySelector(".previous-track-btn"),
      smallToggleBtn: document.getElementsByClassName("small-toggle-btn")
    },
    progressBar: document.querySelector(".progress-box"),
    playListRows: document.getElementsByClassName("play-list-row"),
    trackInfoBox: document.querySelector(".track-info-box")
  };
  var playAHead = false;
  var progressBarIndicator = elements.progressBar.children[0].children[0].children[1];
  var trackLoaded = false;
  var last_touch_x = 0;
  var last_touch_y = 0;
  
  /**
   * Determines the buffer progress
   *
   * @param audio The audio element on the page
   **/
  var bufferProgress = function (audio) {
    var bufferedTime = (audio.buffered.end(0) * 100) / audio.duration;
    var progressBuffer = elements.progressBar.children[0].children[0].children[0];
    progressBuffer.style.width = bufferedTime + "%";
  };

  /**
   * A utility function for getting the event coordinates based on browser type.
   * ISSUE: on a touchscreen, the coordinates cannot be retrieved if nothing is touching the screen
   *        this is problematic when handling the end of a touch input
   *        the current solution is to store the most recent coordinates of the input in last_touch_x and last_touch_y
   *
   * @param e The JavaScript event
   **/
  var getXY = function (e) {
    e.preventDefault();

    var progressBarRect = elements.progressBar.getBoundingClientRect();
    var coords = {
      x: null,
      y: null
    };
  
    var isTouchSupported = "ontouchstart" in window;
    if (isTouchSupported && e.touches.length > 0) { // For touch events
      coords.x = e.touches[0].clientX - progressBarRect.left;
      coords.y = e.touches[0].clientY - progressBarRect.top;
      last_touch_x = coords.x;
      last_touch_y = coords.y;
    } 
    else { // For non-touch events
      coords.x = e.clientX - progressBarRect.left;
      coords.y = e.clientY - progressBarRect.top;
    }
  
    if (isNaN(coords.x)) {
      coords.x = last_touch_x;
      coords.y = last_touch_y;
    }

    return coords;
  };
  
  /**
   * Gets the location of the progress indicator when it is clicked
   *
   * @param e The event object
   **/
  var handleProgressIndicatorClick = function (e) {
    var progressBar = document.querySelector(".progress-box");
    var xCoords = getXY(e).x;

    return xCoords / progressBar.children[0].offsetWidth;
  };

  /**
   * Handles the touchstart event
   *
   * @param e The event object
   **/
  var touchStart = function(e) {
    e.preventDefault();

    window.addEventListener("touchmove", moveProgressIndicator);
    audio.removeEventListener("timeupdate", trackTimeChanged, false);
    playAHead = true;
  };

  /**
   * Handles the touchend event
   *
   * @param e The event object
   **/
  var touchEnd = function(e) {
    e.preventDefault();

    if (playAHead === true) {
      var duration = parseFloat(audio.duration);
      var progressIndicatorClick = parseFloat(handleProgressIndicatorClick(e));
      window.removeEventListener("touchmove", moveProgressIndicator);
      audio.currentTime = duration * progressIndicatorClick;
      audio.addEventListener("timeupdate", trackTimeChanged, false);
      playAHead = false;
    }
  };
  
  /**
   * Handles the mousedown event by a user and determines if the mouse is being moved
   *
   * @param e The event object
   **/
  var mouseDown = function (e) {
    window.addEventListener("mousemove", moveProgressIndicator, true);
    audio.removeEventListener("timeupdate", trackTimeChanged, false);
    playAHead = true;
  };
  
  /**
   * Handles the mouseup event by a user
   *
   * @param e The event object
   **/
  var mouseUp = function (e) {
    if (playAHead === true) {
      var duration = parseFloat(audio.duration);
      var progressIndicatorClick = parseFloat(handleProgressIndicatorClick(e));
      window.removeEventListener("mousemove", moveProgressIndicator, true);
      audio.currentTime = duration * progressIndicatorClick;
      audio.addEventListener("timeupdate", trackTimeChanged, false);
      playAHead = false;
    }
  };

  /**
   * Handles the small toggle button click event
   *
   * @param e The event object
   **/
  var smallButtonClick = function (e) {
    e.preventDefault();

    var selectedTrack = parseInt(this.parentNode.getAttribute("data-track-row"));
    if (selectedTrack !== currentTrack) {
      resetPlayStatus();
      currentTrack = null;
      trackLoaded = false;
    }
  
    if (trackLoaded === false) {
      currentTrack = parseInt(selectedTrack);
      setTrack();
    } 
    else {
      playBack(this);
    }
  }

  /**
   * Handles the media error event
   *
   * @param e The event object
   **/
  var mediaError = function (e) {
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        alert('You aborted the video playback.');
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        alert('A network error caused the audio download to fail.');
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        alert('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        alert('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
        break;
      default:
        alert('An unknown error occurred.');
        break;
    }
      trackLoaded = false;
      resetPlayStatus();
  }

  /**
   * Handles the audio ended event
   *
   * @param e The event object
   **/
  var audioEnded = function (e) {
    trackHasEnded();
  }

  /**
   * Handles the large toggle button click event
   *
   * @param e The event object
   **/
  var largeButtonClick = function (e) {
    if (trackLoaded === false) {
      currentTrack = parseInt(1);
      setTrack()
    } 
    else {
      playBack();
    }
  }

  /**
   * Handles the next button click event
   *
   * @param e The event object
   **/
  var nextButtonClick = function (e) {
    if (this.disabled !== true) {
      currentTrack++;
      trackLoaded = false;
      resetPlayStatus();
      setTrack();
    }
  }

  /**
   * Handles the previous button click event
   *
   * @param e The event object
   **/
  var previousButtonClick = function (e) {
    if (this.disabled !== true) {
      currentTrack--;
      trackLoaded = false;
      resetPlayStatus();
      setTrack();
    }
  }

  /**
   * Moves the progress indicator to a new point in the audio
   *
   * @param e The event object
   **/
  var moveProgressIndicator = function (e) {
    var progressBarRect = elements.progressBar.getBoundingClientRect();
    var progressBarWidth = progressBarRect.width;
    var progressBarIndicatorWidth = progressBarIndicator.offsetWidth;
    var newPosition = getXY(e).x - (progressBarIndicatorWidth / 2);
  
    if (newPosition < 0) {
      newPosition = 0;
    } 
    else if (newPosition > progressBarWidth - progressBarIndicatorWidth) {
      newPosition = progressBarWidth - progressBarIndicatorWidth;
    }
  
    progressBarIndicator.style.left = newPosition + "px";
  };

  /**
   * Controls playback of the audio element
   *
   **/
  var playBack = function () {
    if (elements.audio.paused) {
      elements.audio.play();
      updatePlayStatus(true);
      document.title = "\u25B6 " + document.title;
    } 
    else {
      elements.audio.pause();
      updatePlayStatus(false);
      document.title = document.title.substr(2);
    }
  };
  
  /**
   * Sets the track if it hasn't already been loaded yet
   *
   **/
  var setTrack = function () {
    var songURL = elements.audio.children[currentTrack - 1].src;
    elements.audio.setAttribute("src", songURL);
    elements.audio.load();
    trackLoaded = true;
    setTrackTitle(currentTrack, elements.playListRows);
    setActiveItem(currentTrack, elements.playListRows);
    elements.trackInfoBox.style.visibility = "visible";
    playBack();
  };
  
  /**
   * Sets the actively playing item within the playlist
   *
   * @param currentTrack The current track number being played
   * @param playListRows The playlist object
   **/
  var setActiveItem = function (currentTrack, playListRows) {
    for (var i = 0; i < playListRows.length; i++) {
      playListRows[i].children[2].className = "track-title";
    }
    
    playListRows[currentTrack - 1].children[2].className = "track-title active-track";
  };
  
  /**
   * Sets the text for the currently playing song
   *
   * @param currentTrack The current track number being played
   * @param playListRows The playlist object
   **/
  var setTrackTitle = function (currentTrack, playListRows) {
    var trackTitleBox = document.querySelector(".player .info-box .track-info-box .track-title-text");
    var trackTitle = playListRows[currentTrack - 1].children[2].outerText;
      
    trackTitleBox.innerHTML = null;
    trackTitleBox.innerHTML = trackTitle;
    document.title = trackTitle;
  };
  
  /**
   * Plays the next track when a track has ended playing
   *
   **/
  var trackHasEnded = function () {
    parseInt(currentTrack);
    currentTrack = (currentTrack === elements.playListRows.length) ? 1 : currentTrack + 1;
    trackLoaded = false;
    resetPlayStatus();
    setTrack();
  };
  
  /**
   * Updates the time for the song being played
   *
   **/
  var trackTimeChanged = function () {
    var currentTimeBox = document.querySelector(".player .info-box .track-info-box .audio-time .current-time");
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    var durationBox = document.querySelector(".player .info-box .track-info-box .audio-time .duration");
    var trackCurrentTime = trackTime(currentTime);
    var trackDuration = trackTime(duration);
    
    currentTimeBox.innerHTML = null;
    currentTimeBox.innerHTML = trackCurrentTime;
    
    durationBox.innerHTML = null;
    durationBox.innerHTML = trackDuration;
    
    updateProgressIndicator(audio);
    bufferProgress(audio);
  };
  
  /**
   * A utility function for converting a time in milliseconds to a readable time of minutes and seconds
   *
   * @param seconds The time in seconds
   *
   * @return time The time in minutes and/or seconds
   **/
  var trackTime = function (seconds) {
    var min = 0;
    var sec = Math.floor(seconds);
    var time = 0;

    min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
    time = min + ':' + sec;
      
    return time;
  };
  
  /**
   * Updates both the large and small toggle buttons accordingly
   *
   * @param audioPlaying A boolean value indicating if audio is playing or paused
   **/
  var updatePlayStatus = function (audioPlaying) {
    if (audioPlaying) {
      elements.playerButtons.largeToggleBtn.children[0].className = "large-pause-btn";
      elements.playerButtons.smallToggleBtn[currentTrack - 1].children[0].className = "small-pause-btn";
    } 
    else {
      elements.playerButtons.largeToggleBtn.children[0].className = "large-play-btn";
      elements.playerButtons.smallToggleBtn[currentTrack - 1].children[0].className = "small-play-btn";
    }
    
    // Update next and previous buttons accordingly
    if (currentTrack === 1) {
      elements.playerButtons.previousTrackBtn.disabled = true;
      elements.playerButtons.previousTrackBtn.className = "previous-track-btn disabled";
      
      if (elements.playListRows.length > 1) {
        elements.playerButtons.nextTrackBtn.disabled = false;
        elements.playerButtons.nextTrackBtn.className = "next-track-btn";
      }
    } 
    else if (currentTrack > 1 && currentTrack !== elements.playListRows.length) {
      elements.playerButtons.previousTrackBtn.disabled = false;
      elements.playerButtons.previousTrackBtn.className = "previous-track-btn";
      elements.playerButtons.nextTrackBtn.disabled = false;
      elements.playerButtons.nextTrackBtn.className = "next-track-btn";
    } 
    else if (currentTrack === elements.playListRows.length) {
      elements.playerButtons.nextTrackBtn.disabled = true;
      elements.playerButtons.nextTrackBtn.className = "next-track-btn disabled";
      
      if (elements.playListRows.length > 1) {
        elements.playerButtons.previousTrackBtn.disabled = false;
        elements.playerButtons.previousTrackBtn.className = "previous-track-btn";
      }
    }
  };
  
  /**
   * Updates the location of the progress indicator according to how much time left in audio
   *
   **/
  var updateProgressIndicator = function () {
    var currentTime = parseFloat(elements.audio.currentTime);
    var duration = parseFloat(elements.audio.duration);
    var indicatorLocation = 0;
    var progressBarWidth = parseFloat(elements.progressBar.offsetWidth);
    var progressIndicatorWidth = parseFloat(progressBarIndicator.offsetWidth);
    var progressBarIndicatorWidth = progressBarWidth - progressIndicatorWidth;
    indicatorLocation = progressBarIndicatorWidth * (currentTime / duration);
    progressBarIndicator.style.left = indicatorLocation + "px";
  };
  
  /**
   * Resets all toggle buttons to be play buttons
   *
   **/
  var resetPlayStatus = function () {
    var smallToggleBtn = elements.playerButtons.smallToggleBtn;
    elements.playerButtons.largeToggleBtn.children[0].className = "large-play-btn";
    
    for (var i = 0; i < smallToggleBtn.length; i++) {
      if (smallToggleBtn[i].children[0].className === "small-pause-btn") {
        smallToggleBtn[i].children[0].className = "small-play-btn";
      }
    }
  };

  /**
   * Initializes the html5 audio player and the playlist
   *
   **/
  var initPlayer = function () {
    if (currentTrack === 1 || currentTrack === null) {
      elements.playerButtons.previousTrackBtn.disabled = true;
    }
    
    // Determine event type
    const isTouchDevice = 'ontouchstart' in window;
    const toggleEvent = isTouchDevice ? 'touchend' : 'click';

    // Add playlist event listeners
    for (var i = 0; i < elements.playListRows.length; i++) {
      var smallToggleBtn = elements.playerButtons.smallToggleBtn[i];
      smallToggleBtn.addEventListener(toggleEvent, smallButtonClick, false);
    }

    // Add audio event listeners
    elements.audio.addEventListener("timeupdate", trackTimeChanged, false);
    elements.audio.addEventListener("ended", audioEnded, false);
    elements.audio.addEventListener("error", mediaError, false);

    // Add player event listeners
    elements.playerButtons.largeToggleBtn.addEventListener(toggleEvent, largeButtonClick, false);
    elements.playerButtons.nextTrackBtn.addEventListener(toggleEvent, nextButtonClick, false);
    elements.playerButtons.previousTrackBtn.addEventListener(toggleEvent, previousButtonClick, false);
    
    // Add progress indicator pointer event listeners
    progressBarIndicator.addEventListener("mousedown", mouseDown, false); 
    window.addEventListener("mouseup", mouseUp, false);

    // Add progress indicator touchscreen event listeners
    progressBarIndicator.addEventListener('touchstart', touchStart);
    window.addEventListener('touchend',  touchEnd);
  };

  return {
    initPlayer: initPlayer
  };
};
  
(function () {
  var player = new audioPlayer();
  player.initPlayer();
})();
