import {httpService} from './http.service.js';

const ENDPOINT = 'photo';

async function getPhotos(filterBy) {
  return await httpService.get(ENDPOINT, filterBy);
}

async function getPhotoById(photoId) {
  return await httpService.get(`${ENDPOINT}/${photoId}`);
}

async function removePhoto(photoId) {
  return await httpService.delete(`${ENDPOINT}/${photoId}`);
}

async function savePhoto(photo) {
  var photo = JSON.parse(JSON.stringify(photo));
  if (photo._id) {
    return await httpService.put(`${ENDPOINT}/${photo._id}`, photo);
  } else {
    if (!photo.name) photo.name = 'Unknown';
    return await httpService.post(ENDPOINT, photo);
  }
}

// async function addReview(photoId, review) {
//     return await httpService.post(`${ENDPOINT}/${photoId}/review`, review);
// }

function getEmptyPhoto() {
  var emptyPhoto = {
    label: '',
    imgUrl: '',
  };
  return emptyPhoto;
}

export const photoService = {
  getPhotos,
  getPhotoById,
  getEmptyPhoto,
  removePhoto,
  savePhoto,
  // addReview
};
