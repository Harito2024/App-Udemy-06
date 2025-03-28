import { Movie } from "@/infrastruture/interfaces/movie.interface";
import {
  View,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import MoviePoster from "./MoviePoster";
import { useEffect, useRef } from "react";

interface Props {
  movies: Movie[];
  title?: string;
  classname?: string;

  loadNextPage?: () => void;
}

const MoviesHorizonalList = ({
  title,
  movies,
  classname,
  loadNextPage,
}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (!isEndReached) return;

    isLoading.current = true;

    console.log("Cargar Siguientes Peliculas");
    loadNextPage && loadNextPage();
  };

  return (
    <View className={`${classname}`}>
      {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}
      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} smallPoster />
        )}
        onScroll={onScroll}
      />
    </View>
  );
};

export default MoviesHorizonalList;
