import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store.js";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState("characters");

    useEffect(() => {
        actions.getPeople();
        actions.getPlanets();
        actions.getVehicles();
    }, []);

 
    const categories = [
        "all", "characters", "planets","vehicles", "more"
    ];

    const getActiveData = () => {
        if (activeTab === "characters") return { list: store.people, folder: "characters", type: "people" };
        if (activeTab === "planets") return { list: store.planets, folder: "planets", type: "planets" };
        if (activeTab === "vehicles") return { list: store.vehicles, folder: "vehicles", type: "vehicles" };
        return { list: [], folder: "", type: "" };  
    };

    const currentCategory = getActiveData();

    return (
        <div className="container-fluid text-light min-vh-100 p-4 p-md-5" style={{ backgroundColor: "#151515" }}>
            

            <div className="border-bottom border-secondary border-opacity-50 pb-3 mb-4">
                <h4 className="text-light text-uppercase m-0" style={{ letterSpacing: "1px", fontSize: "18px" }}>
                    BROWSE DATABANK <span style={{ color: "#d12f2f" }}>//</span>
                </h4>
            </div>

            <div className="row mt-4">
    
                <div className="col-md-2 mb-4">
                    <div className="text-secondary mb-3 text-uppercase fw-bold" style={{ fontSize: "11px", letterSpacing: "1.5px" }}>
                        BROWSE
                    </div>
                    <div className="d-flex flex-column gap-3 text-uppercase fw-bold" style={{ fontSize: "13px" }}>
                        {categories.map((tab) => (
                            <span
                                key={tab}
                                style={{ 
                                    cursor: "pointer", 
                                    color: activeTab === tab ? "#ffffff" : "#a3a3a3",
                                    borderLeft: activeTab === tab ? "3px solid #d12f2f" : "3px solid transparent",
                                    paddingLeft: "12px",
                                    transition: "all 0.2s ease"
                                }}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </span>
                        ))}
                    </div>
                </div>

  
                <div className="col-md-10">
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                        {currentCategory.list && currentCategory.list.map((item, index) => {
                            const itemID = item.uid || (item.url ? item.url.split("/").filter(Boolean).pop() : index + 1);
                            const isFav = store.favorites && store.favorites.some(fav => fav.uid === itemID && fav.type === currentCategory.type);
                            
                            return (
                                <div className="col" key={itemID}>
                                    <div className="card h-100 border-0 rounded-2 overflow-hidden" style={{ backgroundColor: "#282727" }}>
                                        <Link to={`/detail/${currentCategory.type}/${itemID}`} className="text-decoration-none">
                                        
                                            <div style={{ 
                                                aspectRatio: "3/4", 
                                                overflow: "hidden", 
                                                backgroundColor: "#111",
                                                borderBottom: "2px solid #b85a6a" 
                                            }}>
                                                <img
                                                    src={`https://starwars-visualguide.com/assets/img/${currentCategory.folder}/${itemID}.jpg`}
                                                    className="w-100 h-100"
                                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                        e.currentTarget.parentNode.innerHTML = `<div class="d-flex h-100 align-items-center justify-content-center text-secondary" style="font-size: 10px;">NO IMAGE</div>`;
                                                    }}
                                                />
                                            </div>
                                        </Link>
                                        

                                        <div className="card-body p-3 d-flex flex-column justify-content-between">
                                            <Link to={`/detail/${currentCategory.type}/${itemID}`} className="text-decoration-none text-light mb-2">
                                                <h6 className="text-uppercase m-0" style={{ fontSize: "13px", fontWeight: "600" }}>
                                                    {item.name}
                                                </h6>
                                            </Link>
                                            
                                            <div className="d-flex justify-content-between align-items-center mt-2">

                                                <div style={{ color: "#b85a6a", fontSize: "10px", fontWeight: "bold", letterSpacing: "1px" }}>
                                                    <i className="fa-solid fa-diagram-project me-1"></i> DATABANK
                                                </div>

                                                <span
                                                    style={{ cursor: "pointer", fontSize: "14px" }}
                                                    className={isFav ? "text-warning" : "text-secondary"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        actions.toggleFavorite({ uid: itemID, name: item.name, type: currentCategory.type });
                                                    }}
                                                >
                                                    <i className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {currentCategory.list.length === 0 && (
                            <div className="col-12 text-secondary mt-5 text-center">
                                No data available for this category yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};