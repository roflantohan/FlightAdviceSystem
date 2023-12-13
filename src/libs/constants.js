
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

const FlightRulesOptions = [
    { value: 'I', label: 'I' },
    { value: 'V', label: 'V' },
    { value: 'Y', label: 'Y' },
    { value: 'Z', label: 'Z' }
]

const TypeOfFlightOptions = [
    { value: 'S', label: 'S' },
    { value: 'N', label: 'N' },
    { value: 'G', label: 'G' },
    { value: 'M', label: 'M' },
    { value: 'X', label: 'X' },
]

const WakeTurbulenceCatOptions = [
    { value: 'L', label: 'L' },
    { value: 'M', label: 'M' },
    { value: 'H', label: 'H' },
    { value: 'J', label: 'J' },
]

const TypeOfACOptions = [
    { value: 'Gulf550', label: 'Gulf550' },
    { value: '777', label: '777' },
    { value: '734', label: '734' },
    { value: 'an24', label: 'an24' },
    { value: 'an12', label: 'an12' },
    { value: '733', label: '733' },
    { value: 'emb-phen100', label: 'emb-phen100' },
    { value: '321', label: '321' },
    { value: '320', label: '320' },
]



export default {
    FlightRules,
    TypeOfFlight,
    WakeTurbulenceCat,
    Equipment1,
    Equipment2,
    Aerodroms,
    TypeOfACOptions,
}


