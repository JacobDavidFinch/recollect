import axios from "axios";
import { useQuery } from "react-query";
import { queryCache } from 'react-query'
import {postUser} from './API'

const url = (path, extPath = "") => `/api/${path}${extPath}`;

const getUser = async (userName) => {
  console.log(userName);
    const lowerCaseUserName = userName.toLowerCase();
    const { data } = await axios.get(
      url(lowerCaseUserName)
    );
    return data;
};

const getCards = async (userName) => {
  console.log(userName);
  const lowerCaseUserName = userName.toLowerCase();
  console.log(lowerCaseUserName);
  console.log(url(lowerCaseUserName, "/cards"));
    const { data } = await axios.get(
      url(lowerCaseUserName, "/cards")
    );
    return data;
};

  // if(cards.length && !state.tags.length){
  //   dispatch({type: "tags", payload: tags(cards)});
  // }

const refetchUser = () => queryCache.refetchQueries("user");

const prefetchUser = async (userName, tags, cb) => {
  console.log(userName);
  const queryData = await queryCache.prefetchQuery('user', () =>
    getUser(userName)).then(result => {
      console.log(result);
      if(result === null){
        postUser(userName);
      }
      if(result && result.cards && result.cards.length && !tags.length){
        cb(result.cards);
      }
    })
}

export {getUser, getCards, refetchUser, prefetchUser, useQuery};