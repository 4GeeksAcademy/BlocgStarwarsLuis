export const initialStore = () => {
  return {
    characters: [],
    episodes: [],
    locations: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };

    case 'set_episodes':
      return {
        ...store,
        episodes: action.payload
      };

    case 'set_locations':
      return {
        ...store,
        locations: action.payload
      };

    case 'add_favorite':
      if (store.favorites.some(fav => fav.id === action.payload.id && fav.type === action.payload.type)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.id === action.payload.id && fav.type === action.payload.type)
        )
      };

    default:
      throw Error('Unknown action: ' + action.type);
  }
}
