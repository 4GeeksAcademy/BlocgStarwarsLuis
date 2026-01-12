export const getImageUrl = (type, id) => {
  const imageMap = {
    people: {
      1: "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
      2: "https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png",
      3: "https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png",
      4: "https://vignette.wikia.nocookie.net/starwars/images/d/d0/Vader_ROTJ_Fathead.png",
      5: "https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png",
      10: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Obi-Wan_Kenobi_TPM.jpg",
      13: "https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png",
      14: "https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png",
      20: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png"
    },
    planets: {
      1: "https://vignette.wikia.nocookie.net/starwars/images/b/b0/Tatooine_TPM.png",
      2: "https://vignette.wikia.nocookie.net/starwars/images/4/4a/Alderaan.jpg",
      3: "https://vignette.wikia.nocookie.net/starwars/images/d/d4/Yavin-4-SWCT.png",
      4: "https://vignette.wikia.nocookie.net/starwars/images/1/1d/Hoth_SWCT.png",
      5: "https://vignette.wikia.nocookie.net/starwars/images/d/d4/Dagobah.jpg",
      8: "https://vignette.wikia.nocookie.net/starwars/images/f/f0/Naboo_planet.png",
      9: "https://vignette.wikia.nocookie.net/starwars/images/1/16/Coruscant-EotE.jpg"
    },
    vehicles: {
      4: "https://vignette.wikia.nocookie.net/starwars/images/3/34/Sandcrawler-Fathead.png",
      6: "https://vignette.wikia.nocookie.net/starwars/images/5/54/T-16_Skyhopper_DICE.png",
      7: "https://vignette.wikia.nocookie.net/starwars/images/3/3f/X-34_landspeeder.png",
      8: "https://vignette.wikia.nocookie.net/starwars/images/7/73/TIEfighter2-Fathead.png",
      14: "https://vignette.wikia.nocookie.net/starwars/images/b/b9/Snowspeeder_DICE.png",
      16: "https://vignette.wikia.nocookie.net/starwars/images/3/32/TIE_Bomber_BF.png",
      19: "https://vignette.wikia.nocookie.net/starwars/images/6/6e/All_Terrain_Armored_Transport.jpg"
    }
  };

  return imageMap[type]?.[id] || `https://via.placeholder.com/400x600/1a1a1a/feda4a?text=${type}`;
};

export const getPlaceholder = (name) => {
  return `https://via.placeholder.com/400x600/000000/feda4a?text=${encodeURIComponent(name)}`;
};
