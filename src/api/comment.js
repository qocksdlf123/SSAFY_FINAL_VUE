import {Instance} from "./api.js";

const api = Instance();


async function selectByBoard(articleNo,success, fail){
    await api.get(`/commentBoard/${articleNo}`).then(success).catch(fail);
}

async function selectByComment(commentNo,success, fail){
    await api.get(`/comment/`+commentNo).then(success).catch(fail);
}

async function registerComment(comment, success, fail){
    await api.post(`/comment`,JSON.stringify(comment)).then(success).catch(fail);
}

async function updateComment(comment, success, fail){
    await api.put(`/comment`,JSON.stringify(comment)).then(success).catch(fail);
}

async function deleteComment(commentNo, success, fail){
    await api.delete(`/comment/${commentNo}`).then(success).catch(fail);
}


export {selectByBoard,selectByComment ,registerComment, updateComment,deleteComment };