function SongRankingList({songs}){
    console.log(songs);
    return(
      <>
        <ol>
          <li className="song-ranking-list-item">
              <div className="song-ratings-container">
                  <div className="song-rating">
                      <span className="song-rating-button material-icons">thumb_up</span>
                      <span className="song-rating-count">0</span>
                  </div>
                  <div className="song-rating">
                      <span className="song-rating-button material-icons">thumb_down</span>
                      <span className="song-rating-count">0</span>
                  </div>
              </div>
              <div className="song-name"> song_name </div>
          </li>
        </ol>
      </>
    );
  }
  
  export default SongRankingList;