import axios from "axios";
import { useQuery } from "react-query";
import { queryCache } from 'react-query'

const url = (path) => `/api/${path}`;

const getUser = async (key, userName) => {
    const lowerCaseUserName = userName.toLowerCase();
    const { data } = await axios.get(
      url(lowerCaseUserName)
    );
    return data;
};

const refetchUser = () => queryCache.refetchQueries("user");

export {getUser, refetchUser, useQuery}