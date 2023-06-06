import { Instance } from "./api";

const api = Instance();

// like 비교
async function selectDongCode(code, success, fail){
    await api.get(`/dongcode/${code}`).then(success).catch(fail);
}

// equal 비교
async function selectOneDongCode(dongCode, success, fail){
    await api.get(`/dongcode/one/${dongCode}`).then(success).catch(fail);
}

export{selectDongCode, selectOneDongCode};