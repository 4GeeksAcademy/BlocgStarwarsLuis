const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: []
        },
        actions: {
            // Cargar personajes
            getPeople: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people");
                    if (!response.ok) throw new Error("Error en getPeople");
                    const data = await response.json();
                    setStore({ people: data.results });
                } catch (error) {
                    console.error(error);
                }
            },

            // Cargar planetas
            getPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets");
                    if (!response.ok) throw new Error("Error en getPlanets");
                    const data = await response.json();
                    setStore({ planets: data.results });
                } catch (error) {
                    console.error(error);
                }
            },

            // Cargar vehículos
            getVehicles: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/vehicles");
                    if (!response.ok) throw new Error("Error en getVehicles");
                    const data = await response.json();
                    setStore({ vehicles: data.results });
                } catch (error) {
                    console.error(error);
                }
            },

            // Agregar o eliminar favoritos
            toggleFavorite: (item) => {
                const store = getStore();
                const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type);

                if (isFavorite) {
                    const updatedFavs = store.favorites.filter(fav => !(fav.uid === item.uid && fav.type === item.type));
                    setStore({ favorites: updatedFavs });
                } else {
                    setStore({ favorites: [...store.favorites, item] });
                }
            }
        }
    };
};

export default getState;