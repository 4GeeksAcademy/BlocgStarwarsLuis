from flask import Flask, jsonify
from models import db, People, Planet, User, Favorite

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///starwars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return jsonify({"msg": "Star Wars API running 🚀"})


@app.route("/people", methods=["GET"])
def get_people():
    people = People.query.all()
    return jsonify([p.serialize() for p in people]), 200


@app.route("/people/<int:people_id>", methods=["GET"])
def get_single_person(people_id):
    person = People.query.get(people_id)
    if not person:
        return jsonify({"error": "Person not found"}), 404
    return jsonify(person.serialize()), 200


@app.route("/planets", methods=["GET"])
def get_planets():
    planets = Planet.query.all()
    return jsonify([p.serialize() for p in planets]), 200


@app.route("/planets/<int:planet_id>", methods=["GET"])
def get_single_planet(planet_id):
    planet = Planet.query.get(planet_id)
    if not planet:
        return jsonify({"error": "Planet not found"}), 404
    return jsonify(planet.serialize()), 200


@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


def get_current_user():
    return User.query.first()


@app.route("/users/favorites", methods=["GET"])
def get_user_favorites():
    user = get_current_user()
    if not user:
        return jsonify([]), 200

    favorites = []

    for fav in user.favorites:
        if fav.people:
            favorites.append({
                "type": "people",
                "item": fav.people.serialize()
            })
        if fav.planet:
            favorites.append({
                "type": "planet",
                "item": fav.planet.serialize()
            })

    return jsonify(favorites), 200


@app.route("/favorite/people/<int:people_id>", methods=["POST"])
def add_favorite_people(people_id):
    user = get_current_user()
    person = People.query.get(people_id)

    if not user or not person:
        return jsonify({"error": "User or person not found"}), 404

    favorite = Favorite(user_id=user.id, people_id=person.id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({"msg": "Favorite person added"}), 201


@app.route("/favorite/planet/<int:planet_id>", methods=["POST"])
def add_favorite_planet(planet_id):
    user = get_current_user()
    planet = Planet.query.get(planet_id)

    if not user or not planet:
        return jsonify({"error": "User or planet not found"}), 404

    favorite = Favorite(user_id=user.id, planet_id=planet.id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({"msg": "Favorite planet added"}), 201


@app.route("/favorite/people/<int:people_id>", methods=["DELETE"])
def delete_favorite_people(people_id):
    user = get_current_user()

    favorite = Favorite.query.filter_by(
        user_id=user.id,
        people_id=people_id
    ).first()

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"msg": "Favorite person deleted"}), 200


@app.route("/favorite/planet/<int:planet_id>", methods=["DELETE"])
def delete_favorite_planet(planet_id):
    user = get_current_user()

    favorite = Favorite.query.filter_by(
        user_id=user.id,
        planet_id=planet_id
    ).first()

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"msg": "Favorite planet deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)

