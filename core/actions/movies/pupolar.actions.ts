import { moviesApi } from "@/core/api/movie-api";
import { MoviesDBMoviesResponse } from "@/infrastruture/interfaces/moviedb-response";
import { MovieMapper } from "@/infrastruture/mappers/movie.mapper";

export const popularMoviesAction = async () => {

    try {
        const {data} = await moviesApi.get<MoviesDBMoviesResponse>('/popular')
        /* console.log(JSON.stringify(data, null , 2)) */

        const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie)
        //console.log(JSON.stringify(movies, null , 2))
        
        return movies;

    } catch (error) {
        console.log(error)
        throw 'Cannot load playing movies';
        
    }
    
}