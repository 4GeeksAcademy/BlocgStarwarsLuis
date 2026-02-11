import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ imgURL, title, children }) => {
  const { store, dispatch } = useGlobalReducer();

  const addFavorite = () => {
    dispatch({ type: "add_favorite", payload: { name: title } });
  };

  return (
    <>
      <div className="card">
        <img src={imgURL} className="card-img-top" alt="Luke Skywalker" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {children}
          <div className="d-flex gap-5">
            <a href="#" className="btn btn-primary me-5">
              Learn more
            </a>
            <button
              onClick={addFavorite}
              className="btn btn-primary"
              type="button"
            >
              <i className="fa-regular fa-bookmark"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
