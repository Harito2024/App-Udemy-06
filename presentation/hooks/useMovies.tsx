import { nowPlayingAction } from "@/core/actions/movies/now-playing.actions";
import { popularMoviesAction } from "@/core/actions/movies/pupolar.actions";
import { topRatedMoviesAction } from "@/core/actions/movies/top-rated.actions";
import { upcomingMoviesAction } from "@/core/actions/movies/upcoming.actions ";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  //QUeries
  const nowPlayingQuery = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const popularQuery = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const topRatedQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movies", "top-rated"],
    queryFn: ({ pageParam }) => {
      console.log({ pageParam });
      return topRatedMoviesAction({ page: pageParam });
    },
    staleTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage, pages) => {
      pages.length + 1;
    },
  });

  const upcomingQuery = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: upcomingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    nowPlayingQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
  };
};
