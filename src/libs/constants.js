'use strict'
const MIN_HORIZONTAL_DISTANCE = 9000 // m
const MIN_VERTICAL_DISNTACE = 300 // m
const RADIUS_EARTH = 6378100 // m 
const START_DATETIME = new Date();
START_DATETIME.setHours(9, 0, 0, 0);

const MIN_TIMEOUT = 3 * 60 * 1000 //miliseconds
const FlightRules = ["I", "V", "Y", "Z"];
const TypeOfFlight = ["S", "N", "G", "M", "X"];
const WakeTurbulenceCat = ["L", "M", "H", "J"];
const Equipment1 = ["N", "S", "A", "B", "C", "D", "E1", "E2", "E3", "F", "G", "H", "I", "J1", "J2", "J3", "J4", "J5", "J6", "J7", "K", "L", "M1", "M2", "M3", "O", "P1", "P2", "P3", "R", "T", "U", "V", "W", "X", "Y", "Z"]
const Equipment2 = ["N", "A", "C", "E", "H", "I", "L", "X", "P", "S"];
const Aerodroms = [
    "LRCL", "EFHK", "UKLI",
    "UKLL", "UKKG",
    "EPRZ", "UKDR",
    "LROV"
]
const TypeOfAircraft = [
    'Gulf550',
    '777',
    '734',
    'an24',
    'an12',
    '733',
    'emb-phen100',
    '321',
    '320'
]

const POINTS = [
    "BUKOV",
    "OTRAK",
    "SORON",
    "UKLI",
    "IVF",
    "VI",
    "LADOB",
    "GEMTO",
    "RULUT",
    "SOLNU",
    "TETNA",
    "PEVOT",
    "TADUN",
    "VABOD",
    "TOVNI",
    "RUMUK",
    "DORER",
    "OSGAS",
    "KOVUS",
    "LIV",
    "UKLL",
    "LONLA",
    "TAKON",
    "GOTRA",
    "TAKET",
    "UNDOL",
    "POBED",
    "PIGUM",
    "KOKUP",
    "DIBED",
    "MALBE",
    "LOPNU",
    "SITBA",
    "EROMO",
]

const COORDINATES_POINTS = {
    "BUKOV": {
      latitude: 47.951667,
      longitude: 25.958333,
    },
    "OTRAK": {
      latitude: 48.948889,
      longitude: 26.686111,
    },
    "SORON": {
      latitude: 49.761667,
      longitude: 27.85,
    },
    "UKLI": {
      latitude: 48.884167,
      longitude: 24.686111,
    },
    "IVF": {
      latitude: 48.884167,
      longitude: 24.691389,
    },
    "VI": {
      latitude: 48.940833,
      longitude: 23.044444,
    },
    "LADOB": {
      latitude: 48.950278,
      longitude: 22.431944,
    },
    "GEMTO": {
      latitude: 48.133333,
      longitude: 22.594444,
    },
    "RULUT": {
      latitude: 48.648333,
      longitude: 23.638889,
    },
    "SOLNU": {
      latitude: 49.296667,
      longitude: 25.398333,
    },
    "TETNA": {
      latitude: 49.83333333,
      longitude: 26.41666667,
    },
    "PEVOT": {
      latitude: 50.181944,
      longitude: 27.043889,
    },
    "TADUN": {
      latitude: 51.90138889,
      longitude: 24.68805556,
    },
    "VABOD": {
      latitude: 50.75833333,
      longitude: 24.795,
    },
    "TOVNI": {
      latitude: 49.5375,
      longitude: 24.66916667,
    },
    "RUMUK": {
      latitude: 48.02666667,
      longitude: 23.34333333,
    },
    "DORER": {
      latitude: 50.46583333,
      longitude: 27.20777778,
    },
    "OSGAS": {
      latitude: 50.13333333,
      longitude: 25.5,
    },
    "KOVUS": {
      latitude: 50.14222222,
      longitude: 24.24138889,
    },
    "LIV": {
      latitude: 49.81194444,
      longitude: 23.95138889,
    },
    "UKLL": {
      latitude: 49.8125,
      longitude: 23.956111,
    },
    "LONLA": {
      latitude: 48.34,
      longitude: 22.31972222,
    },
    "TAKON": {
      latitude: 48.53666667,
      longitude: 23.18833333,
    },
    "GOTRA": {
      latitude: 48.91333333,
      longitude: 25.59833333,
    },
    "TAKET": {
      latitude: 48.97,
      longitude: 27.84166667,
    },
    "UNDOL": {
      latitude: 48.45222222,
      longitude: 27.72166667,
    },
    "POBED": {
      latitude: 48.72055556,
      longitude: 25.45722222,
    },
    "PIGUM": {
      latitude: 49.26472222,
      longitude: 24.01166667,
    },
    "KOKUP": {
      latitude: 49.52833333,
      longitude: 23.655,
    },
    "DIBED": {
      latitude: 49.88833333,
      longitude: 23.05833333,
    },
    "MALBE": {
      latitude: 48.82388889,
      longitude: 22.375,
    },
    "LOPNU": {
      latitude: 49.07416667,
      longitude: 26.68138889,
    },
    "SITBA": {
      latitude: 49.39083333,
      longitude: 27.84694444,
    },
    "EROMO": {
      latitude: 47.95361111,
      longitude: 23.94638889,
    },
  }


/**
    fp.AI = data.aircraftIndetification;
    fp.FR = data.flightRules.value;
    fp.TF = data.typeOfFlight.value;
    fp.TA = data.typeOfAircraft.value;
    fp.EQ1 = data.equipment1.value;
    fp.EQ2 = data.equipment2.value;
    fp.WTC = data.wakeTurbulenceCat.value;
    fp.CS = data.cruisingSpeed;
    fp.LVL = data.level;
    fp.DESA = data.destinationAerodrom.value;
    fp.DEPA = data.departureAerodrom.value;
    fp.ALTA = data.altnAerodrom.value;
    fp.SALTA = data.secAltnAerodrom.value;
    fp.E = data.endurance;
    fp.R = data.routes.map(route => route.value)
    fp.SD = startDate;
    fp.ST = startTime;
    fp.EET = totalEET;
*/


  const OTHERS_FP = [
    {
        AI: "D-IABC", 
        R: ["BUKOV", "OTRAK", "SORON"],
        CS: 465,
        LVL: 390,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "PH-BDJ",
        R: ["UKLI", "IVF", "VI", "LADOB"],
        CS: 630,
        LVL: 300,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "EC-JDT", 
        R: ["GEMTO", "RULUT", "SOLNU", "TETNA", "PEVOT"],
        CS: 650,
        LVL: 370,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "UR-16382", 
        R: ["TADUN", "VABOD", "TOVNI", "RULUT", "RUMUK"],
        CS: 462,
        LVL: 410,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "UR-RTE", 
        R: ["DORER", "OSGAS", "KOVUS", "LIV", "UKLL"],
        CS: 425,
        LVL: 420,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "UK-35262", 
        R: ["LONLA", "TAKON", "RULUT", "IVF", "GOTRA", "OTRAK", "TAKET"],
        CS: 650,
        LVL: 410,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "5B-TRE", 
        R: ["UNDOL", "POBED", "IVF", "PIGUM", "KOKUP", "DIBED"],
        CS: 431,
        LVL: 400,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "F-FZDA", 
        R: ["MALBE", "RULUT", "POBED", "LOPNU", "SITBA"],
        CS: 660,
        LVL: 390,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "UR-TQQ", 
        R: ["EROMO", "RULUT", "KOKUP", "LIV"],
        CS: 455,
        LVL: 400,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    {
        AI: "SP-AGA", 
        R: ["RUMUK", "VI", "DIBED"],
        CS: 680,
        LVL: 420,
        SD: START_DATETIME,
        ST: START_DATETIME,
    },
    
  ]

export default {
    MIN_HORIZONTAL_DISTANCE,
    MIN_VERTICAL_DISNTACE,
    RADIUS_EARTH,
    MIN_TIMEOUT,
    FlightRules,
    TypeOfFlight,
    WakeTurbulenceCat,
    Equipment1,
    Equipment2,
    Aerodroms,
    TypeOfAircraft,
    POINTS,
    COORDINATES_POINTS,
    OTHERS_FP
}


