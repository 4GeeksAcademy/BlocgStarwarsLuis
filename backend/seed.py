from app import app
from models import db, User, People, Planet

with app.app_context():
    user = User(email="test@starwars.com")
    luke = People(name="Luke Skywalker", gender="male", birth_year="19BBY")
    tatooine = Planet(name="Tatooine", climate="arid", population="200000")

    db.session.add_all([user, luke, tatooine])
    db.session.commit()

    print("Datos insertados correctamente ✅")
