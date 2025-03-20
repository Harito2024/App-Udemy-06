import axios from 'axios'

export const moviesApi = axios.create({
    baseURL: process.env.EXPO_PUBIC_MOVIE_DB_URL,
    params:{
        language: 'es-MX',
        api_key:process.env.EXPO_PUBIC_MOVIE_DB_KEY,
    }
})