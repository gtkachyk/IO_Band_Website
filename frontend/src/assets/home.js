import { urls } from './constants.js';

export const home = {
    background_image: urls.assetsPathToPublic + 'images/background_main_dark.jpg',
    featured_audio_media: {
        name: 'II_0_II_III',
        image: urls.assetsPathToPublic + 'images/albums/II_0_II_III/home_link.jpg',
        link: urls.websiteLink + 'music/II_0_II_III'
    },
    featured_social_media: {
        tiktok: 'https://www.tiktok.com/@intentionaloffence/video/7305519091761073414',
        instagram: 'https://www.instagram.com/p/CrAjRCuu3Sr/'
    },
    slideshow_images: [
        urls.assetsPathToPublic + 'images/slideshow/grotesque_being_r_small.jpg',
        urls.assetsPathToPublic + 'images/slideshow/grotesque_being_g_small.jpg'
    ]
}