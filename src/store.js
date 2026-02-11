export const initialStore = () => {
  return {
    todos: [],
    favoriteList: [],
    characterList: [],
    planetList: [],
    vehicleList: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    case "add_favorite":
      const { name } = action.payload;
      return { ...store, favoriteList: [...store.favoriteList, name] };
    case "remove_favorite":
      const favoriteListFiltered = store.favoriteList.filter(
        (item) => item !== action.payload.name
      );
      return { ...store, favoriteList: favoriteListFiltered };
    case "update_characterList":
      const characterList = action.payload;
      return { ...store, characterList };
    case "update_planetList":
      const planetList = action.payload;
      return { ...store, planetList };
    case "update_vehicleList":
      const vehicleList = action.payload;
      return { ...store, vehicleList };

    default:
      throw Error("Unknown action.");
  }
}
