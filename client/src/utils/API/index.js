import saferr from "saferr";
import axios from "axios";

const safeGet = saferr(axios.get);
const safePost = saferr(axios.post);
const safeDelete = saferr(axios.delete);
const safePut = saferr(axios.put);

const handleErr = (err) => {
    console.log(err.message);
    return
}

const handleResult = (result) => {
    console.log(result.data);
}


const url = (path) => `/api/${path}`;

const getAllTags = () => {
    const [err, result] = await safeGet(url('allTags'));
    return err ? handleErr(err) : handleResult(result)
}

const getAllLinks = () => {
    const [err, result] = await safeGet(url('allLinks'));
    return err ? handleErr(err) : handleResult(result)
}

const getAllLinksByTag = (tagsArr) => {
    const [err, result] = await safeGet(url('linksByTags'));
    return err ? handleErr(err) : handleResult(result)
}

const createLink = (link) => {
    const [err, result] = await safePost(url('link'));
    return err ? handleErr(err) : handleResult(result)
}

const updateLink = (id) => {
    const [err, result] = await safePut(url('link'));
    return err ? handleErr(err) : handleResult(result)
}

const deleteLink = (id) => {
    const [err, result] = await safeDelete(url('link'));
    return err ? handleErr(err) : handleResult(result)
}

const updateLinkStats = () => {
    const [err, result] = await safeGet(url('allTags'));
    return err ? handleErr(err) : handleResult(result)
}

const recentTests = () => {

}

const recentLinks = () => {

}