import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Detail = () => {
    const { type, id } = useParams();
    const [properties, setProperties] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Error cargando detalles");
                return res.json();
            })
            .then(data => {
                setProperties(data.result.properties);
                setDescription(data.result.description);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [type, id]);

    if (loading) return <div className="text-center text-light my-5"><h3>Loading data from the galaxy...</h3></div>;
    if (!properties) return <div className="text-center text-danger my-5"><h3>Entity not found</h3></div>;

    const categoryImg = type === "people" ? "characters" : type;

    return (
        <div className="container bg-dark text-light p-4 rounded border border-secondary mt-4">
         
            <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/${categoryImg}/${id}.jpg`} 
                        alt={properties.name} 
                        className="img-fluid rounded" 
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                        onError={(e) => { e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                    />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center px-4">
                    <h1 className="text-warning display-4 mb-3">{properties.name}</h1>
                    <p className="lead text-muted fs-5">
                        {description || "A Star Wars universe entity with specialized properties detailed below."} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum risus sit amet lectus convallis, id luctus diam pretium.
                    </p>
                </div>
            </div>

            <hr className="border-danger my-4" />

            <div className="row text-center text-danger fw-bold g-3">
                {type === "people" && (
                    <>
                        <div className="col-6 col-md-2"><div>Name</div><span className="text-light fw-normal">{properties.name}</span></div>
                        <div className="col-6 col-md-2"><div>Birth Year</div><span className="text-light fw-normal">{properties.birth_year}</span></div>
                        <div className="col-6 col-md-2"><div>Gender</div><span className="text-light fw-normal">{properties.gender}</span></div>
                        <div className="col-6 col-md-2"><div>Height</div><span className="text-light fw-normal">{properties.height} cm</span></div>
                        <div className="col-6 col-md-2"><div>Skin Color</div><span className="text-light fw-normal">{properties.skin_color}</span></div>
                        <div className="col-6 col-md-2"><div>Eye Color</div><span className="text-light fw-normal">{properties.eye_color}</span></div>
                    </>
                )}
                {type === "planets" && (
                    <>
                        <div className="col-6 col-md-2"><div>Name</div><span className="text-light fw-normal">{properties.name}</span></div>
                        <div className="col-6 col-md-2"><div>Climate</div><span className="text-light fw-normal">{properties.climate}</span></div>
                        <div className="col-6 col-md-2"><div>Population</div><span className="text-light fw-normal">{properties.population}</span></div>
                        <div className="col-6 col-md-2"><div>Orbital Period</div><span className="text-light fw-normal">{properties.orbital_period} days</span></div>
                        <div className="col-6 col-md-2"><div>Rotation Period</div><span className="text-light fw-normal">{properties.rotation_period} h</span></div>
                        <div className="col-6 col-md-2"><div>Diameter</div><span className="text-light fw-normal">{properties.diameter} km</span></div>
                    </>
                )}
                {type === "vehicles" && (
                    <>
                        <div className="col-6 col-md-2"><div>Model</div><span className="text-light fw-normal">{properties.model}</span></div>
                        <div className="col-6 col-md-2"><div>Vehicle Class</div><span className="text-light fw-normal">{properties.vehicle_class}</span></div>
                        <div className="col-6 col-md-2"><div>Cost</div><span className="text-light fw-normal">{properties.cost_in_credits} credits</span></div>
                        <div className="col-6 col-md-2"><div>Max Speed</div><span className="text-light fw-normal">{properties.max_atmosphering_speed}</span></div>
                        <div className="col-6 col-md-2"><div>Passengers</div><span className="text-light fw-normal">{properties.passengers}</span></div>
                        <div className="col-6 col-md-2"><div>Length</div><span className="text-light fw-normal">{properties.length} m</span></div>
                    </>
                )}
            </div>

            <div className="mt-4 text-end">
                <Link to="/" className="btn btn-outline-warning">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};