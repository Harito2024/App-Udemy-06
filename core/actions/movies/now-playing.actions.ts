import { moviesApi } from "@/core/api/movie-api";

export const nowPlayingAction = async () => {

    try {
        const {data} = await moviesApi.get('/now_playing')

        console.log(JSON.stringify(data, null , 2))
        return [];

    } catch (error) {
        console.log(error)
        throw 'Cannot load playing movies';
        
    }
    
}