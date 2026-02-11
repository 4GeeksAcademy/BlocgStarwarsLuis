import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();

  const favorites = store.favoriteList || [];

  const removeFavorite = (name) => {
    dispatch({
      type: "remove_favorite",
      payload: { name: item },
    });
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites ({favorites.length})
        </button>

        <ul className="dropdown-menu">
          {favorites.map((item, index) => (
            <li
              key={item || index}
              className="d-flex justify-content-between align-item-center p-2"
            >
              <span className="dropdown-item-text">{item}</span>
              <button
                onClick={() => removeFavorite(item)}
                className="btn btn-second btn-sm p-0 m-0"
              >
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
