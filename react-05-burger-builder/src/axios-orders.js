import axios from 'axios';
import {firebaseUrl} from "./firebaseUrl";

// firebaseUrl.js file was not added to git to ensure privacy
const instance = axios.create({
    baseURL: firebaseUrl
})

export default instance;
