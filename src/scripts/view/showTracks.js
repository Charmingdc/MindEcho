'use strict';

export const showTracks = (mood, category) => {
  
  // loop through all moods tracks
      mood.tracks.forEach(track => {
        const playBtn = `<i class="fa-solid fa-circle-play">`; // create a variable for play icon

        const trackDp = document.createElement('div'); // create trackDp
        trackDp.innerHTML = playBtn; // set Playbtn as trackDp innerHTML 

        const trackName = document.createElement('h3');
        trackName.textContent = track.name; // created a h3 header and set track name as its text

        const trackMin = document.createElement('p');
        const audio = new Audio(track.media_url);
        audio.onloadedmetadata = () => {
          trackMin.textContent = (audio.duration / 60).toFixed(2);
        }

        const trackInfo = document.createElement('div');
        trackInfo.appendChild(trackName); // created a div for track Infos and append trackName to it
        trackInfo.appendChild(trackMin);

        const trackBox = document.createElement('div');
        trackBox.appendChild(trackDp);
        trackBox.appendChild(trackInfo);

        const trackBoxWrap = document.createElement('div');
        trackBoxWrap.classList.add('tracks-box-wrapper');
        trackBoxWrap.appendChild(trackBox);
        
        category.appendChild(trackBoxWrap);
      });
}
