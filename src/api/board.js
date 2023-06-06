import {Instance} from "./api.js";

const api = Instance();

async function searchBoard(success, fail){
    await api.get(`/board`).then(success).catch(fail);
}

async function selectBySubject(subject,success, fail){
    await api.get(`/boardBySubject?subject=`+subject).then(success).catch(fail);
}

async function selectById(id,success, fail){
    await api.get(`/boardById?id=`+id).then(success).catch(fail);
}

async function selectBoard(boardId, success, fail){
    await api.get(`/board/${boardId}`).then(success).catch(fail);
}

async function updateBoard(board, success, fail){
    await api.put(`/board`,JSON.stringify(board)).then(success).catch(fail);
}

async function deleteBoard(boardId, success, fail){
    await api.delete(`/board/${boardId}`).then(success).catch(fail);
}

async function registerBoard(board, success, fail){
    await api.post(`/board`,JSON.stringify(board)).then(success).catch(fail);
}
export {searchBoard,selectBoard ,updateBoard, deleteBoard,registerBoard,selectBySubject,selectById };