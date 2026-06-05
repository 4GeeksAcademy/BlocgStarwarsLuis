import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store.js";

export const Detail = () => {
    const { type, id } = useParams();
    const { store, actions } = useContext(Context);
    
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const imageFolders = {
        characters: "characters",
        planets: "planets",
        vehicles: "vehicles"
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
             
                const apiType = type === "characters" ? "people" : type;
                const response = await fetch(`https://www.swapi.tech/api/${apiType}/${id}`);
                if (!response.ok) throw new Error("Error obteniendo detalles técnicos");                
                const data = await response.json();
                setDetails(data.result.properties);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [type, id]);


    if (loading) {
        return (
            <div className="container-fluid text-light min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#151515" }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

  
    if (!details) {
        return (
            <div className="container-fluid text-light min-vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: "#151515" }}>
                <h3 className="text-uppercase tracking-wider">Data not found //</h3>
                <Link to="/" className="btn btn-outline-danger mt-3 text-uppercase rounded-0">Back to Databank</Link>
            </div>
        );
    }


    const isFav = store.favorites.some(fav => fav.uid === id && fav.type === type);

    return (
        <div className="container-fluid text-light min-vh-100 p-3 p-md-4" style={{ backgroundColor: "#151515" }}>
            <div className="mb-3">
                <Link to="/" className="text-decoration-none text-secondary text-uppercase fw-bold small tracking-widest hover:text-light">
                    <i className="fa-solid fa-chevron-left me-2"></i> Back to Databank
                </Link>
            </div>

            <div className="row g-4 justify-content-center align-items-center mb-4">
  
                <div className="col-12 col-md-4 col-lg-3">
                    <div className="position-relative border border-secondary border-opacity-25 rounded-0 overflow-hidden mx-auto" style={{ maxHeight: "250px", maxWidth: "250px" }}>
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/${imageFolders[type] || "characters"}/${id}.jpg`} 
                            className="img-fluid w-100 h-100" 
                            alt={details.name}
                            style={{ objectFit: "cover" }}
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/250x250/282828/888888?text=NO+IMAGE"; 
                            }}
                        />
                        <div className="position-absolute bottom-0 start-0 w-100 bg-danger" style={{ height: "4px" }}></div>
                    </div>
                </div>

            
                <div className="col-12 col-md-8 col-lg-7">
                    <div className="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25 pb-2">
                        <h2 className="text-uppercase fw-bold tracking-wide m-0" style={{ letterSpacing: "1px" }}>
                            {details.name}
                        </h2>
                        <button 
                            className="btn btn-link text-decoration-none p-0 fs-3"
                            onClick={() => actions.toggleFavorite({ uid: id, name: details.name, type: type })}
                            style={{ color: isFav ? "#ffc107" : "#6c757d" }}
                        >
                            <i className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                        </button>
                    </div>
                    <p className="text-light mt-2" style={{ fontSize: "14px" }}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi.
                    </p>
                </div>
            </div>

          
            <div className="row text-center text-danger border-top border-danger pt-3 mt-2 mx-auto" style={{ backgroundColor: "#151515", maxWidth: "900px" }}>
                
              
                {(type === "people" || type === "characters") && (
                    <>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Name</h6>
                            <p style={{ fontSize: "14px" }}>{details.name}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Birth Year</h6>
                            <p style={{ fontSize: "14px" }}>{details.birth_year}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Gender</h6>
                            <p style={{ fontSize: "14px" }}>{details.gender}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Height</h6>
                            <p style={{ fontSize: "14px" }}>{details.height}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Skin Color</h6>
                            <p style={{ fontSize: "14px" }}>{details.skin_color}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Eye Color</h6>
                            <p style={{ fontSize: "14px" }}>{details.eye_color}</p>
                        </div>
                    </>
                )}

            
                {type === "planets" && (
                    <>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Name</h6>
                            <p style={{ fontSize: "14px" }}>{details.name}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Climate</h6>
                            <p style={{ fontSize: "14px" }}>{details.climate}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Population</h6>
                            <p style={{ fontSize: "14px" }}>{details.population}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Orbital Period</h6>
                            <p style={{ fontSize: "14px" }}>{details.orbital_period}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Rotation Period</h6>
                            <p style={{ fontSize: "14px" }}>{details.rotation_period}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Diameter</h6>
                            <p style={{ fontSize: "14px" }}>{details.diameter}</p>
                        </div>
                    </>
                )}

  
                {type === "vehicles" && (
                    <>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Name</h6>
                            <p style={{ fontSize: "14px" }}>{details.name}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Model</h6>
                            <p style={{ fontSize: "14px" }}>{details.model}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Class</h6>
                            <p style={{ fontSize: "14px" }}>{details.vehicle_class}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Passengers</h6>
                            <p style={{ fontSize: "14px" }}>{details.passengers}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Length</h6>
                            <p style={{ fontSize: "14px" }}>{details.length}</p>
                        </div>
                        <div className="col-4 col-md-2 mb-2">
                            <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>Crew</h6>
                            <p style={{ fontSize: "14px" }}>{details.crew}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};