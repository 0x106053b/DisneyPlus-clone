import axios from 'axios'

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    params : {
        api_key : "bec76652ab207ff270795e37d448ba77",
        language : "ko-KR"
    }
})

export default instance; 