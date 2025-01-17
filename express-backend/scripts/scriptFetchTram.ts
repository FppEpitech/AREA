import { promises as fs } from 'fs';

export async function isTramwayCloseScript(): Promise<boolean> {
    try {
        console.log('Fetching tramway stops data...');

        const response = await fetch('https://open.tan.fr/ewp/arrets.json', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch tramway stops: ${response.status}`);
        }

        const stops = await response.json();

        const filteredStops = stops
            .map((stop: any) => {
                const filteredLines = stop.ligne.filter((line: any) =>
                    ["1", "2", "3"].includes(line.numLigne)
                );

                if (filteredLines.length > 0) {
                    return {
                        codeLieu: stop.codeLieu,
                        libelle: stop.libelle
                    };
                }

                return null;
            })
            .filter((stop: any) => stop !== null);

        console.log('Filtered tramway stops:', filteredStops);

        await fs.writeFile(
            './filtered_tramway_stops.json',
            JSON.stringify(filteredStops, null, 2),
            'utf-8'
        );

        console.log('Filtered tramway stops saved to filtered_tramway_stops.json');

        return false;
    } catch (error: any) {
        console.error('Error checking tramway stops:', error.message || error);
        return false;
    }
}


isTramwayCloseScript();
