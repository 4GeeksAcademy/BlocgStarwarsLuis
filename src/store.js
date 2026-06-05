import React, { useState, useEffect } from "react";

export const Context = React.createContext(null);

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: []
        },
        actions: {
            getPeople: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people");
                    if (!response.ok) throw new Error("Error cargando personajes");
                    const data = await response.json();
                    setStore({ people: data.results });
                } catch (error) {
                    console.error(error);
                }
            },

            getPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets");
                    const data = await response.json();
                    setStore({ planets: data.results });
                } catch (error) {
                    console.error(error);
                }
            },

            getVehicles: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/vehicles");
                    const data = await response.json();
                    setStore({ vehicles: data.results });
                } catch (error) {
                    console.error(error);
                }
            },

            toggleFavorite: (item) => {
                const store = getStore();
                const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type);

                if (isFavorite) {
                    const updatedFavorites = store.favorites.filter(fav => !(fav.uid === item.uid && fav.type === item.type));
                    setStore({ favorites: updatedFavorites });
                } else {
                    setStore({ favorites: [...store.favorites, item] });
                }
            }
        }
    };
};


const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
 
        }, []);

      
        return React.createElement(
            Context.Provider,
            { value: state },
            React.createElement(PassedComponent, props)
        );
    };
    
    return StoreWrapper;
};

export default injectContext;