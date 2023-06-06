import {Instance} from "./api.js";

const api = Instance();

async function getArticle(success, fail){
    await api.get(`/news`).then(success).catch(fail);
}

export {getArticle};