import React, { useEffect, useContext } from "react";
import { Context } from "../store.js"; 
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.people.length === 0) actions.getPeople();
        if (store.planets.length === 0) actions.getPlanets();
        if (store.vehicles.length === 0) actions.getVehicles();
    }, []);

 
    const getImgUrl = (type, uid) => {
        const category = type === "people" ? "characters" : type;
        return `https://starwars-visualguide.com/assets/img/${category}/${uid}.jpg`;
    };

    const renderSection = (title, data, type) => (
        <div className="mb-5">
            <h2 className="text-danger mb-4">{title}</h2>
            <div className="d-flex flex-row flex-nowrap overflow-auto pb-3 gap-4" style={{ scrollbarWidth: "thin" }}>
                {data.map((item) => {
                    const itemWithCategory = { ...item, type: type };
                    const isFav = store.favorites.some(fav => fav.uid === item.uid && fav.type === type);

                    return (
                        <div className="card bg-dark text-light border-secondary" style={{ minWidth: "18rem", maxWidth: "18rem" }} key={item.uid}>
                            <img 
                                src={getImgUrl(type, item.uid)} 
                                className="card-img-top" 
                                alt={item.name}
                                style={{ height: "250px", objectFit: "cover" }}
                                onError={(e) => { e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }} 
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title text-truncate">{item.name}</h5>
                                <div className="d-flex justify-content-between mt-3">
                                    <Link to={`/detail/${type}/${item.uid}`} className="btn btn-outline-primary">
                                        Learn more!
                                    </Link>
                                    <button 
                                        className="btn btn-outline-warning" 
                                        onClick={() => actions.toggleFavorite(itemWithCategory)}
                                    >
                                        <i className={isFav ? "fas fa-heart" : "far fa-heart"}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="container-fluid mt-4">
            {renderSection("Characters", store.people, "people")}
            {renderSection("Planets", store.planets, "planets")}
            {renderSection("Vehicles", store.vehicles, "vehicles")}
        </div>
    );
};