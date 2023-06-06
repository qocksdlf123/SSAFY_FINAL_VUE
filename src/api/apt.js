import {Instance} from "./api.js";

const api = Instance();

// like로 조건 비교
async function selectApt(dongCode, success, fail){
    await api.get(`/apt/${dongCode}`).then(success).catch(fail);
}

// 통계 정보 가져오기
async function selectStats(aptCode, success, fail){
    await api.get(`/apt/stats/${aptCode}`).then(success).catch(fail);
}

export {selectApt, selectStats};