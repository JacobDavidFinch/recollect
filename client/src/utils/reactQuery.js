import axios from "axios";
import { useQuery } from "react-query";
import { queryCache } from 'react-query'

const url = (path, extPath = "") => `/api/${path}${extPath}`;

const getUser = async (userName) => {
    const lowerCaseUserName = userName.toLowerCase();
    const { data } = await axios.get(
      url(lowerCaseUserName)
    );
    return data;
};

const getCards = async (userName) => {
    const lowerCaseUserName = userName.toLowerCase();
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
  const queryData = await queryCache.prefetchQuery('user', () =>
    getUser(userName)).then(result => {
      console.log(result);
      if(result.cards && result.cards.length && !tags.length){
        cb(result.cards);
      }
    })
}

export {getUser, getCards, refetchUser, prefetchUser, useQuery};