const {
	getPicturesFolder,
	getDocumentsFolder,
	getMusicFolder,
	getVideosFolder
} = require('platform-folders');
const path = require('path');

const filetypes = [
	['jpg', getPicturesFolder()],
	['png', getPicturesFolder()],
	['gif', getPicturesFolder()],
	['tif', getPicturesFolder()],
	['jpeg', getPicturesFolder()],
	['raw', getPicturesFolder()],
	['deb', path.join(getDocumentsFolder(), 'deb')],
	['m4a', getMusicFolder()],
	['flac', getMusicFolder()],
	['mp3', getMusicFolder()],
	['wav', getMusicFolder()],
	['mp4', getVideosFolder()],
	['avi', getVideosFolder()],
	['mov', getVideosFolder()],
	['flv', getVideosFolder()]
];

exports.filetypes = filetypes;