import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://thesimpsonsapi.com/api/characters?page=1"),
          fetch("https://thesimpsonsapi.com/api/characters?page=2"),
          fetch("https://thesimpsonsapi.com/api/characters?page=3")
        ]);

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        const allCharacters = dataArrays.flatMap(data => data.results);

        const uniqueCharacters = Array.from(
          new Map(allCharacters.map(char => [char.id, char])).values()
        );

        const validCharacters = uniqueCharacters
          .filter(char => char.name && char.name.trim() !== '')
          .slice(0, 60);

        dispatch({ type: "set_characters", payload: validCharacters });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (store.characters.length === 0) {
      fetchData();
    }
  }, []);

  const handleAddFavorite = (item) => {
    const isFavorite = store.favorites.some(fav => fav.id === item.id && fav.type === 'character');

    if (isFavorite) {
      dispatch({ type: "remove_favorite", payload: { id: item.id, type: 'character' } });
    } else {
      dispatch({ type: "add_favorite", payload: { ...item, type: 'character' } });
    }
  };

  const isFavorite = (id) => {
    return store.favorites.some(fav => fav.id === id && fav.type === 'character');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{
        fontFamily: "'Creepster', cursive",
        fontSize: "3rem",
        color: "#FFD90F",
        textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
      }}>
        The Simpsons Characters
      </h1>
      <div className="row g-4">
        {store.characters.map((character) => (
          <div key={character.id} className="col-md-4 col-lg-3 col-sm-6">
            <Card
              item={character}
              onAddFavorite={handleAddFavorite}
              isFavorite={isFavorite(character.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 