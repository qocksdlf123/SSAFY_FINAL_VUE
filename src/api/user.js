import {Instance} from "./api.js";

const api = Instance();

async function loginUser(user, success, fail){
    await api.post(`/user/login`,JSON.stringify(user)).then(success).catch(fail);
}

async function selectUser(userid, success, fail){
    await api.get(`/user/${userid}`).then(success).catch(fail);
}

async function updateUser(user, success, fail){
    await api.put(`/user`,JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUser(userid, success, fail){
    await api.delete(`/user/${userid}`).then(success).catch(fail);
}

async function registUser(user, success, fail){
    await api.post(`/user`,JSON.stringify(user)).then(success).catch(fail);
}

async function tokenCheck(success,fail){
    api.defaults.headers["accessToken"] = sessionStorage.getItem("accessToken");
    await api.get(`user/info`).then(success).catch(fail);
}

async function selectAlarm(userId, success, fail){
    await api.get(`/user/alarm/${userId}`).then(success).catch(fail);
}

export {loginUser,selectUser ,updateUser, deleteUser,registUser,tokenCheck, selectAlarm};