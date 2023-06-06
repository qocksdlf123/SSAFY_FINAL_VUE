import {Instance} from "./api.js";

const api = Instance();


async function selectById(userId,success, fail){
    await api.get(`/bookmarkById/${userId}`).then(success).catch(fail);
}

async function select(bookmarkNo,success, fail){
    await api.get(`/bookmark/`+bookmarkNo).then(success).catch(fail);
}

async function selectOrderBy(success, fail){
    await api.get('/bookmark/rank').then(success).catch(fail);
}

async function registerBookmark(bookmark, success, fail){
    await api.post(`/bookmark`,JSON.stringify(bookmark)).then(success).catch(fail);
}

async function deleteBookmark(bookmarkNo, success, fail){
    await api.delete(`/bookmark/${bookmarkNo}`).then(success).catch(fail);
}

export {selectById,select ,registerBookmark, deleteBookmark, selectOrderBy};