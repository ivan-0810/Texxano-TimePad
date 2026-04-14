import http from '../http'

export const timeTracksServices = {
    startTimeTrack,
    stopTimeTrack,
    createManualTimeTrack,
    updateTimeTrack,
    startTimeTrackForProject,
    deleteAllTimeTrack,
    deleteByIdTimeTrack,
    cloneTimeTrack
};
async function startTimeTrack() {
    const response = await http.post("/timetracker/tracks/start", null);
    return response;
}

async function stopTimeTrack() {
    const response = await http.post("/timetracker/tracks/stop", null);
    return response;
}

async function createManualTimeTrack(payload) {
    const response = await http.post("/timetracker/tracks", payload)
    return response;
}

async function updateTimeTrack(payload) {
    const response = await http.put("/timetracker/tracks", payload)
    return response;
}

async function startTimeTrackForProject(payload) {
    const response = await http.post("/timetracker/tracks/start/project", payload);
    return response;
}

async function deleteAllTimeTrack() {
    const response = await http.delete(`/timetracker/tracks`);
    return response;
}

async function deleteByIdTimeTrack(id) {
    const response = await http.delete(`/timetracker/tracks/${id}`);
    return response;
}

async function cloneTimeTrack(payload) {
    const response = await http.post("/timetracker/tracks/clone", payload)
    return response;
}
