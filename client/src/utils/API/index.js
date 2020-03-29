import saferr from "saferr";
import axios from "axios";

const safeGet = saferr(axios.get);
const safePost = saferr(axios.post);
const safeDelete = saferr(axios.delete);
const safePut = saferr(axios.put);

const handleErr = (err) => {
    console.log(err.message);
    return "error";
}

const handleResult = (result) => {
    console.log(result.data);
    return result.data;
}

const url = (path) => `/api/${path}`;

// ========================= USER =======================================

// USER will have all cards and tests created. Fetching user will fetch cards and tests/
// IF this application gets more use, I will want to break cards into their own collection. Without sharing though there is no point

export const fetchUser = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}

// ========================= CARD =======================================

// For updating test percentage, times scene, last time quizzed, adding questions/answers, add tags

export const createCard = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}

export const updateCard = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}

export const deleteCard = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}

// ========================= TEST =======================================

// CREATE/FETCH/UPDATE(TIMES TAKEN)

export const createTest = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}

export const updateTest = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}

export const deleteTest = async () => {
    const [err, result] = await safeGet(url('user'));
    return err ? handleErr(err) : handleResult(result)
}





const getAllLinksByTag = async (tagsArr) => {
    const [err, result] = await safeGet(url('linksByTags'));
    return err ? handleErr(err) : handleResult(result)
}

const createLink = async (link) => {
    const [err, result] = await safePost(url('link'));
    return err ? handleErr(err) : handleResult(result)
}

const updateLink = async (id) => {
    const [err, result] = await safePut(url('link'));
    return err ? handleErr(err) : handleResult(result)
}

const deleteLink = async (id) => {
    const [err, result] = await safeDelete(url('link'));
    return err ? handleErr(err) : handleResult(result)
}

const updateLinkStats = async () => {
    const [err, result] = await safeGet(url('allTags'));
    return err ? handleErr(err) : handleResult(result)
}

const recentTests = async () => {

}

const recentLinks = async () => {

}