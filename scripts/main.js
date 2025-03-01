import {albums} from "./albums.js";
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs';
import {getGradient} from "./gradient.js";

const colorThief = new ColorThief();

let firstColor = [18, 18, 18];
let secondColor;

function renderAlbums() {
    const section = document.querySelector('section');
    section.dataset.gradientRunning = 'false';

    localStorage.getItem('background-image') ? section.style.backgroundImage = localStorage.getItem('background-image') : section.style.backgroundImage = 'linear-gradient(45deg, rgb(18, 18, 18), rgb(18, 18, 18))';
    
    let albumsHTML = '';

    albums.forEach((album) => {
        const albumId = album.albumId;
        const albumImage = album.albumImage;
        const albumName = album.albumName;

        albumsHTML += `
            <button class="album_container js-album-container" data-album-id="${albumId}">
                <div class="album_container_left">
                    <img class="icon js-album-image-${albumId}" src="${albumImage}">
                    <img class="play_icon" src="Icons/spotify_play.png">
                </div>
                <div class="album_container_right">
                    <p class="music_name">${albumName}</p>
                </div>
            </button>
        `;
    });

    document.querySelector('.js-album-grid').innerHTML = albumsHTML;

    document.querySelectorAll('.js-album-container').forEach((album) => {
        const albumId = album.dataset.albumId;

        album.addEventListener('mouseover', () => {
            const img = document.querySelector(`.js-album-image-${albumId}`);
            if (section.dataset.gradientRunning === 'true') return;
            
            secondColor = colorThief.getColor(img);

            if (JSON.stringify(secondColor) !== JSON.stringify(firstColor)) {
                section.dataset.gradientRunning = 'true';
                new Promise ((resolve) => {
                    getGradient('gradient-container', firstColor, secondColor, 'forwards'); 
                    setTimeout(() => {
                        resolve();
                      }, 1000);
                      firstColor = secondColor;
                }).then(() => {
                    localStorage.setItem('background-image', section.style.backgroundImage);
                    section.dataset.gradientRunning = 'false';
                });
            }
        });
    });
}

renderAlbums();
