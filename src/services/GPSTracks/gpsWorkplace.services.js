import http from '../http'

export const gpsWorkplaceServices = {
    createGpsWorkplace,
    updateGpsWorkplace,
    deleteGpsWorkplace
};

function createGpsWorkplace(dataBody) {
    return http.post(`/gps/locations`, dataBody)
        .then(function (response) {
            return response;
        })
}

function updateGpsWorkplace(dataBody) {
    return http.put(`/gps/locations`, dataBody)
        .then(function (response) {
            return response;
        })
}


function deleteGpsWorkplace(id) {
    return http.delete(`/gps/locations/${id}`)
        .then(function (response) {
            return response;
        })
}
