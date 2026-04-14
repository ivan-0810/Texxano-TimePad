import { timeTracksTypes } from '../../type/TimeTracks/timeTracks.types';
import { timeTracksServices } from '../../../services/TimeTracks/timeTracks.services';

export function startTimeTrack() {
    return dispatch => {
        timeTracksServices.startTimeTrack()
            .then(
                data => {
                    if (data.status) {
                        dispatch(failure(data));
                    } else {
                        dispatch(success(data));
                        dispatch(isTracking(data.isTracking))
                    }
                }
            )
    }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}


export function stopTimeTrack() {
    return dispatch => {
        timeTracksServices.stopTimeTrack()
            .then(
                data => {
                    if (data.status) {
                        dispatch(failure(data));
                        if (data.title) {
                        }
                    } else {
                        dispatch(success(data));
                        dispatch(isTracking(false))
                    }
                }
            )
    }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}

export function startTimeTrackForProject(payload) {
    return dispatch => {
        timeTracksServices.startTimeTrackForProject(payload)
            .then(
                data => {
                    if (data.status) {
                        dispatch(failure(data));
                    } else {
                        dispatch(success(data));
                        dispatch(isTracking(data.isTracking))
                    }
                }
            )
    }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}

export function createManualTimeTrack(payload) {
    return dispatch => {
        timeTracksServices.createManualTimeTrack(payload)
            .then(
                data => {
                    if (data.status <= 299) {
                        dispatch(success(data));
                    } else {
                        dispatch(failure(data));
                        if (data.title) {
                        }
                    }
                }
            )
    }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}
export function updateTimeTrack(payload) {
    return dispatch => {
        timeTracksServices.updateTimeTrack(payload)
            .then(
                data => {
                    if (data.status <= 299) {
                        dispatch(success(data));
                    } else {
                        dispatch(failure(data));
                        if (data.title) {
                        }
                    }
                }
            )
    }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}
export function deleteAllTimeTrack() {
    return dispatch => {
        dispatch(request());
        timeTracksServices.deleteAllTimeTrack()
            .then(
                data => {
                    if (data.status <= 299) {
                        dispatch(success(data.status));

                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    }
    function request(data) { return { type: timeTracksTypes.TIMETRACKS_REQUEST, data } }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}
export function deleteByIdTimeTrack(id) {
    return dispatch => {
        dispatch(request(id));
        timeTracksServices.deleteByIdTimeTrack(id,)
            .then(
                data => {
                    if (data.status <= 299) {
                        dispatch(success(data.status));

                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    }
    function request(data) { return { type: timeTracksTypes.TIMETRACKS_REQUEST, data } }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}

export const isTracking = isTracking => ({ type: timeTracksTypes.IS_TIMETRACKS_SUCCESS, isTracking });
export const isChargingPerHour = isTracking => ({ type: timeTracksTypes.IS_CHARGING_PER_HOUR_SUCCESS, isTracking });

export function cloneTimeTrack(payload) {
    return dispatch => {
        timeTracksServices.cloneTimeTrack(payload)
            .then(
                data => {
                    if (data.status <= 299) {
                        dispatch(success(data));
                    } else {
                        dispatch(failure(data));
                        if (data.title) {
                        }
                    }
                }
            )
    }
    function success(data) { return { type: timeTracksTypes.TIMETRACKS_SUCCESS, data } }
    function failure(data) { return { type: timeTracksTypes.TIMETRACKS_FAILURE, data } }
}
