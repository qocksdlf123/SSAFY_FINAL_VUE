import {Instance} from "./api.js";

const api = Instance();

async function selectByNo(no, success, fail){
    await api.get(`/property/no/${no}`).then(success).catch(fail);
}

async function selectByAptCode(aptCode, success, fail){
    await api.get(`/property/aptcode/${aptCode}`).then(success).catch(fail);
}

async function selectByUserId(userId, success, fail){
    await api.get(`/property/userid/${userId}`).then(success).catch(fail);
}

async function registProperty(property, success, fail){
    await api.post(`/property`, JSON.stringify(property)).then(success).catch(fail);
}

async function deleteProperty(no, success, fail){
    await api.delete(`/property/${no}`).then(success).catch(fail);
}

export {selectByNo, selectByAptCode, selectByUserId, registProperty, deleteProperty};