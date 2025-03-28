import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useMovies } from "@/presentation/hooks/useMovies";
import MainSlideshow from "@/presentation/components/movies/MainSlideshow";
import MovieHorizonalList from "@/presentation/components/movies/MovieHorizonalList";

const HomeScreem = () => {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();

  if (nowPlayingQuery.isLoading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator color="purple" size={40} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2 pb-50" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">MoviesApp</Text>
        {/* Carrusel de Imagenes */}
        <MainSlideshow movies={nowPlayingQuery.data ?? []} />
        {/* Popular */}
        <MovieHorizonalList
          title="Populares"
          movies={popularQuery.data ?? []}
          classname="mb-5"
        />
        {/* TopTen */}
        <MovieHorizonalList
          title="Mejor Calificadas"
          movies={topRatedQuery.data?.pages.flat() ?? []}
          classname="mb-5"
          loadNextPage={topRatedQuery.fetchNextPage}
        />
        {/* TopTen */}
        <MovieHorizonalList
          title="Proximamente"
          movies={upcomingQuery.data ?? []}
          classname="mb-5"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreem;
