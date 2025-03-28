import { moviesApi } from "@/core/api/movie-api";
import { MoviesDBMoviesResponse } from "@/infrastruture/interfaces/moviedb-response";
import { MovieMapper } from "@/infrastruture/mappers/movie.mapper";

interface Options {
    page?:number;
    limit?:number;
}

export const topRatedMoviesAction = async ({page=1, limit=10}: Options) => {

    try {
        const {data} = await moviesApi.get<MoviesDBMoviesResponse>('/top_rated', {
            params:{
                page:page,
            }
        })
        /* console.log(JSON.stringify(data, null , 2)) */

        const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie)
        //console.log(JSON.stringify(movies, null , 2))
        
        return movies;

    } catch (error) {
        console.log(error)
        throw 'Cannot load top_rated movies';
        
    }
    
}