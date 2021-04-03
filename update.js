const writeJSON = require("./functies/writeJSON.js");
const haalDataOp = require('./functies/haalDataOp.js');

(async () => {
    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/');
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations');

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    writeJSON(geformatterdestations, 'stations');
    writeJSON(spoorkaart, 'spoorkaart');
})();
