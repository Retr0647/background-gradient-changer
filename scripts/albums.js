export function getAlbum(albumdId) {
    let matchingAlbum;

    albums.forEach((album) =>{
        if (album.albumId === albumdId) {
            matchingAlbum = album;
        }
    });
    return matchingAlbum;
}

export const albums = [{
    albumId: 'Album-1',
    albumImage: 'photos/Album-1.webp',
    albumName: 'audiotele'
}, 
{
    albumId: 'Album-2',
    albumImage: 'photos/Album-2.jpg',
    albumName: 'EKSKLUZYWNY GŁÓD'
},
{   
    albumId: 'Album-3',
    albumImage: 'photos/Album-3.jpg',
    albumName: 'TTHE GRIND'
},
{
    albumId: 'Album-4',
    albumImage: 'photos/Album-4.jpg',
    albumName: 'Café Belga'
},
{
    albumId: 'Album-5',
    albumImage: 'photos/Album-5.jpg',
    albumName: 'Umowa o dzieło'
},
{
    albumId: 'Album-6',
    albumImage: 'photos/Album-6.webp',
    albumName: 'Toxic'
},
{
    albumId: 'Album-7',
    albumImage: 'photos/Album-7.webp',
    albumName: 'Miłość'
},
{   
    albumId: 'Album-8',
    albumImage: 'photos/Album-8.jpg',
    albumName: 'GNX'
}];

