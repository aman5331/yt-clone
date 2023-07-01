const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyCt5Ed0_SDxCjMYFRhBT5u6k4DSVtI-68o";

const container = document.getElementById("videos-container");

async function getVideos(q) {
  const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=videos&maxResults=20`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  const videos = data.items;
  console.log(videos);
}

async function getVideoDetails(videoId) {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=video_id=${videoId}`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  return data.items[0];
}

function renderVideos(videos) {
  container.innerHTML = ``;
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const thumbnailUrl = video.snippet.thumbnails.high.url;
    container.innerHTML += `
      <div class="video-info" onclick="openVideoDetails('${video.id}')" >
          <div class="video-image">
            <img src="${thumbnailUrl}" alt="video title" />
          </div>
          <div class="video-description">
            <div class="channel-avatar">
              <img src="" alt="channel avatar" />
            </div>
            <div class="video-title">${video.snippet.localized.title}</div>
            <div class="channel-description">
              <p class="channel-name">Channel</p>
              <p class="video-views">15K Views</p>
              <p class="video-time">1 week ago</p>
            </div>
          </div>
        </div>
        `;
  }
}

function openVideoDetails(videoId) {
  localStorage.setItem("videoId", videoId);
  window.open("/videoDetails.html");
}

getVideos("");
