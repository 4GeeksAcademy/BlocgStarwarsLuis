export const characterDescriptions = {
  "1": "Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known. After learning the ways of the Force from Obi-Wan Kenobi and Yoda, he helped the Rebel Alliance destroy the Death Star, faced Darth Vader, and ultimately redeemed his father, bringing balance to the Force.",
  "2": "C-3PO is a protocol droid fluent in over six million forms of communication. Built by Anakin Skywalker, he has served various masters throughout the galaxy, often finding himself in the midst of galactic conflicts alongside his counterpart R2-D2.",
  "3": "R2-D2 is a resourceful astromech droid who served Padmé Amidala, Anakin Skywalker, and Luke Skywalker in turn, showing great bravery in rescuing his masters and their friends from many perils. A skilled starship mechanic and fighter pilot's assistant, he formed an unlikely but enduring friendship with C-3PO.",
  "4": "Darth Vader, once known as Anakin Skywalker, was a Jedi prophesied to bring balance to the Force. Seduced by the dark side, he became the Emperor's enforcer, hunting down Jedi survivors. Despite his fearsome reputation, the good in him was never fully extinguished, ultimately sacrificing himself to save his son and destroy the Emperor.",
  "5": "Princess Leia Organa was one of the Rebel Alliance's greatest leaders, fearless on the battlefield and dedicated to ending the tyranny of the Empire. Daughter of Padmé Amidala and Anakin Skywalker, sister of Luke Skywalker, and with a soft spot for scoundrels, Leia ranked among the galaxy's great heroes.",
  "10": "Obi-Wan Kenobi was a legendary Jedi Master who played a significant role in the fate of the galaxy. A noble man known for his skills with the Force, Obi-Wan trained Anakin Skywalker, served as a general in the Clone Wars, and guided Luke Skywalker as a mentor, ultimately helping to restore balance to the Force.",
  "13": "Chewbacca, known affectionately as Chewie, was a Wookiee warrior, smuggler, and resistance fighter who fought in the Clone Wars, the Galactic Civil War, and the conflict between the First Order and the Resistance. He hailed from the planet Kashyyyk and became a legendary hero of the Rebel Alliance alongside his lifelong friend Han Solo.",
  "14": "Han Solo was a smuggler who became a leader in the Alliance to Restore the Republic and an instrumental figure in the defeat of the Galactic Empire. Born on Corellia, he became a smuggler, even completing the Kessel Run in less than twelve parsecs. After helping destroy the Death Star, he was frozen in carbonite by Jabba the Hutt.",
  "20": "Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars and instructing Luke Skywalker, guiding him through his training and revealing the truth about his father.",
  "default": "A character from the vast Star Wars galaxy, playing their part in the eternal struggle between the light and dark sides of the Force."
};

export const planetDescriptions = {
  "1": "Tatooine is a harsh desert world orbiting twin suns in the galaxy's Outer Rim. It's a lawless place ruled by Hutt gangsters, where many settlers scratch out a living on moisture farms. Despite its remote location, Tatooine has played a pivotal role in galactic history as the homeworld of Anakin and Luke Skywalker.",
  "2": "Alderaan was a peaceful world and the adopted homeworld of Princess Leia Organa. A beautiful, mountainous planet, it was known for its art and culture. The planet was destroyed by the Empire's Death Star superweapon as a demonstration of its power, making it a symbol of the Empire's cruelty.",
  "3": "Yavin 4 is a moon orbiting the gas giant Yavin. Covered in dense jungle and rainforest, it housed the ancient temples of the Massassi and served as the secret base of the Rebel Alliance. From here, the Rebels launched the starfighter attack that destroyed the first Death Star.",
  "4": "Hoth is the sixth planet in the remote Hoth system. A world of snow and ice, it became the site of a major defeat for the Rebel Alliance when the Empire discovered their secret base there. The battle saw the Empire deploy massive AT-AT walkers against the entrenched Rebel forces.",
  "5": "Dagobah is a remote, fog-shrouded world in the Outer Rim, teeming with life and strong with the Force. The small, swampy planet served as a refuge for Jedi Grand Master Yoda after the fall of the Republic, where he lived in exile and eventually trained Luke Skywalker in the ways of the Jedi.",
  "8": "Naboo is a planet of lush green forests, rolling plains, and sparkling seas. The humans of Naboo and the native Gungans have learned to live in peace, though their societies remain separate. The planet was the homeworld of Padmé Amidala and Sheev Palpatine, and played a crucial role in galactic history.",
  "9": "Coruscant is an ecumenopolis—a city-covered planet—that served as the capital of the Galactic Republic and later the Empire. The entire planet is one vast city, with buildings reaching kilometers into the sky. It was the seat of galactic government for millennia and housed the Jedi Temple.",
  "default": "A world among billions in the Star Wars galaxy, each with its own unique ecosystems, cultures, and role in the grand tapestry of galactic history."
};

export const vehicleDescriptions = {
  "4": "The Sand Crawler is a colossal mobile fortress used by Jawas on Tatooine. These immense treaded vehicles serve as transportation, shelter, and mobile workshops for the diminutive scavengers as they search the desert wastes for salvageable technology and droids to sell to moisture farmers.",
  "6": "The T-16 Skyhopper is a high-performance airspeeder manufactured by Incom Corporation. Popular among young pilots on many worlds, Luke Skywalker used to bulls-eye womp rats in his T-16 back home on Tatooine, skills that would later help him destroy the Death Star.",
  "7": "The X-34 Landspeeder is a civilian vehicle that became iconic in the Star Wars galaxy. Luke Skywalker's landspeeder was a battered but reliable model that could skim across the desert at high speeds. These repulsorlift vehicles are common sights on many worlds throughout the galaxy.",
  "8": "The TIE/LN Starfighter is the iconic symbol of Imperial military might. Twin Ion Engines give the TIE its name and its distinctive scream. Mass-produced and lacking shields or hyperdrive, these fighters rely on numbers and pilot skill. Their ball-shaped cockpit and twin solar panel wings are instantly recognizable.",
  "14": "The Snowspeeder, or T-47 Airspeeder, was adapted by the Rebel Alliance for the cold climate of Hoth. These small, wedge-shaped craft proved vital during the Battle of Hoth, where Rebel pilots used harpoons and tow cables to bring down the Empire's massive AT-AT walkers.",
  "16": "The TIE Bomber is a devastating Imperial starfighter designed for precision bombing runs and surgical strikes. Its distinctive bent-wing design houses ordnance bays carrying proton bombs, guided missiles, and other warheads, making it one of the most feared ships in the Imperial Navy.",
  "19": "The AT-AT (All Terrain Armored Transport) is one of the Empire's most fearsome ground assault vehicles. Standing over 20 meters tall, these four-legged combat walkers are heavily armored, armed with powerful laser cannons, and serve as mobile command centers, capable of striking terror into the hearts of Rebel soldiers.",
  "default": "A vehicle from the Star Wars galaxy, representing the incredible diversity of transportation and military technology developed across countless worlds and civilizations over millennia of galactic history."
};

export const getDescription = (type, id) => {
  switch(type) {
    case 'people':
      return characterDescriptions[id] || characterDescriptions.default;
    case 'planets':
      return planetDescriptions[id] || planetDescriptions.default;
    case 'vehicles':
      return vehicleDescriptions[id] || vehicleDescriptions.default;
    default:
      return "A unique entity from the Star Wars galaxy.";
  }
};
