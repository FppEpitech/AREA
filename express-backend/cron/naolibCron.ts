import axios from 'axios';

interface TramData {
    sens: number;
    terminus: string;
    infotrafic: boolean;
    temps: string;
    dernierDepart: string;
    tempsReel: string;
    ligne: {
        numLigne: string;
        typeLigne: number;
    };
    arret: {
        codeArret: string;
    };
}

export async function isTramwayClose(userId: number, value_json: string): Promise<boolean> {
    try {

        const parsedJson = JSON.parse(value_json);

        const codeArret = parsedJson.codeSite.result;
        const codeLine = parsedJson.tramLine.result;
        const codeTerminus = parsedJson.tramTerminus.result;
        const closeTimeValue = parseInt(parsedJson.closeTime.value);

        if (!codeArret)
            throw new Error("codeArret was not find in JSON.");
        if (!codeLine)
            throw new Error("codeLine was not find in JSON.");
        if (!codeTerminus)
            throw new Error("codeTerminus was not find in JSON.");
        if (isNaN(closeTimeValue))
            throw new Error("closeTime.value is not a valid number.");

        const url = `https://open.tan.fr/ewp/tempsattente.json/${codeArret}`;

        const response = await axios.get<TramData[]>(url);


        const matchingTrams = response.data.filter((tram: any) =>
            tram.ligne.numLigne === codeLine && tram.terminus === codeTerminus
        );


        for (const tram of matchingTrams) {
            const tramTime = tram.temps;

            if (tramTime === 'proche' || (tramTime.endsWith('mn') && parseInt(tramTime) < closeTimeValue)) {
                return true;
            }
        }

        return false;
    } catch (error: any) {
        console.error('Error during verification of proximity about the tramway', error.message || error);
        return false;
    }
}
