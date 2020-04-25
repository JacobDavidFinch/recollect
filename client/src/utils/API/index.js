import saferr from "saferr";
import axios from "axios";
import {refetchUser} from "../reactQuery";

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
const handleAsyncResult = async result => {
    await refetchUser()
    handleResult(result);
}

const url = (path) => `/api/${path}`;

// ========================= USER =======================================

// USER will have all cards and tests created. Fetching user will fetch cards and tests/
// IF this application gets more use, I will want to break cards into their own collection. Without sharing though there is no point

export const fetchUser = async (userName) => {
    const lowerCaseUserName = userName.toLowerCase();
    const [err, result] = await safeGet(url(`${lowerCaseUserName}`));
    return err ? handleErr(err) : handleResult(result);
}

export const postUser = async (userName) => {
    const [err, result] = await safePost(url(`${userName}`));
    return err ? handleErr(err) : handleResult(result);
}

export const removeUser = async (userName) => {
    const [err, result] = await safeDelete(url(`${userName}`));
    return err ? handleErr(err) : handleResult(result);
}

// ========================= CARD =======================================

// For updating test percentage, times scene, last time quizzed, adding questions/answers, add tags

export const postCard = async ( userName, card ) => {
    console.log(card);
    const [err, result] = await safePost(url(`card/${userName}`), {card});
    return err ? handleErr(err) : handleResult(result);
}

export const putCardStats = async ( userName, card, correct ) => {
    console.log(card);
    const [err, result] = await safePost(url(`card/answer/${userName}`), {card, correct});
    return err ? handleErr(err) : handleResult(result);
}

export const putCard = async ( userName, card, index ) => {
    const [err, result] = await safePut(url(`card/${userName}`), {index, card});
    return err ? handleErr(err) : handleResult(result);
}

export const deleteCard = async ( userName, cards ) => {
    const [err, result] = await safeDelete(url(`card/${userName}`), {cards});
    return err ? handleErr(err) : handleResult(result);
}

// ========================= TEST =======================================

// CREATE/FETCH/UPDATE(TIMES TAKEN)

export const postTest = async (userName, test) => {
    console.log(userName);
    console.log(test);
    const [err, result] = await safePost(url(`test/${userName}`), {test});
    return err ? handleErr(err) : await handleAsyncResult(result)
}

export const putTest = async (userName, test, index) => {
    const [err, result] = await safePut(url(`test/${userName}`), {index, test});
    return err ? handleErr(err) : handleResult(result)
}

export const deleteTest = async (userName, tests) => {
    const [err, result] = await safeDelete(url(`test/${userName}`), {tests});
    return err ? handleErr(err) : handleResult(result)
}
