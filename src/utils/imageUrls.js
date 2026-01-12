export const characterImages = {
  '1': 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_5a38c454_461eebf5.jpeg',
  '2': 'https://lumiere-a.akamaihd.net/v1/images/c-3po-main_417a2902.jpeg',
  '3': 'https://lumiere-a.akamaihd.net/v1/images/r2-d2_12d21a50.jpeg',
  '4': 'https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg',
  '5': 'https://lumiere-a.akamaihd.net/v1/images/leia-organa-main_5f45fba6.jpeg',
  '10': 'https://lumiere-a.akamaihd.net/v1/images/obi-wan-kenobi-main_b84f4e90.jpeg',
  '13': 'https://lumiere-a.akamaihd.net/v1/images/Chewbacca-Fathead_f8ffd4ba.jpeg',
  '14': 'https://lumiere-a.akamaihd.net/v1/images/han-solo-main_8cc72c3f.jpeg',
  '20': 'https://lumiere-a.akamaihd.net/v1/images/yoda-main_b7e3f17f.jpeg'
};

export const planetImages = {
  '1': 'https://lumiere-a.akamaihd.net/v1/images/tatooine-main_eb4c6a84.jpeg',
  '2': 'https://lumiere-a.akamaihd.net/v1/images/Alderaan-2_8d0e4bff.jpeg',
  '3': 'https://lumiere-a.akamaihd.net/v1/images/Yavin-4_8ba6bf70.jpeg',
  '4': 'https://lumiere-a.akamaihd.net/v1/images/Hoth_d074f9c6.jpeg',
  '5': 'https://lumiere-a.akamaihd.net/v1/images/Dagobah_1c6e5f96.jpeg',
  '8': 'https://lumiere-a.akamaihd.net/v1/images/naboo-main_69fa130f.jpeg',
  '9': 'https://lumiere-a.akamaihd.net/v1/images/Coruscant_03afedef.jpeg'
};

export const vehicleImages = {
  '4': 'https://lumiere-a.akamaihd.net/v1/images/sandcrawler-main_eb1b036b.jpeg',
  '6': 'https://lumiere-a.akamaihd.net/v1/images/databank_t16skyhopper_01_169_d25bd5e7.jpeg',
  '7': 'https://lumiere-a.akamaihd.net/v1/images/X-34_Landspeeder_7a64c6f6.jpeg',
  '8': 'https://lumiere-a.akamaihd.net/v1/images/tie-fighter_b6a1eb52.jpeg',
  '14': 'https://lumiere-a.akamaihd.net/v1/images/snowspeeder_ef7f9ef0.jpeg',
  '16': 'https://lumiere-a.akamaihd.net/v1/images/TIE-Bomber_73fbb9a1.jpeg',
  '19': 'https://lumiere-a.akamaihd.net/v1/images/AT-AT_89d0105f.jpeg'
};

export const getCharacterImage = (id) => {
  return characterImages[id] || `https://via.placeholder.com/400x600/000000/feda4a?text=Character+${id}`;
};

export const getPlanetImage = (id) => {
  return planetImages[id] || `https://via.placeholder.com/400x600/000000/feda4a?text=Planet+${id}`;
};

export const getVehicleImage = (id) => {
  return vehicleImages[id] || `https://via.placeholder.com/400x600/000000/feda4a?text=Vehicle+${id}`;
};
