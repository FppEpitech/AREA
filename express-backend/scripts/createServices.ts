import prisma from '../prismaClient';

async function createDiscord() {
    try {
        let service = await prisma.service.create({
            data: {
                provider: 'Discord',
                name: 'discord',
                description: 'Discord service',
                color: '#5865F7',
                logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png',
            }
        });
        console.log('Service Discord created');
    } catch (error) {
        console.error('Error creating Discord service, maybe it already exists?');
    }
}


async function createSpotify() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'Spotify',
            name: 'spotify',
            color: '#1DB953',
            description: 'Spotify service',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        }});
        console.log('service spotify created:');
    } catch (error) {
        console.error('Erreur lors de la création du service Spotify, already exists ?');
    }
}

async function createOpenWeatherMap() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'OpenWeatherMap',
            name: 'openweathermap',
            color: '#87CEEB',
            description: 'OpenWeatherMap service',
            logo: 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png',
        }});
        console.log('service openweathermap created:');
    } catch (error) {
        console.error('Erreur lors de la création du service OpenWeatherMap, already exists ?');
    }
}

async function createMail() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'Mail',
            name: 'mail',
            color: '#fa423e',
            description: 'Mail service',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png',
        }});
        console.log('service mail created:');
    } catch (error) {
        console.error('Erreur lors de la création du service Mail, already exists ?');
    }
}

async function createServices() {
    try {
        await createDiscord();
        await createSpotify();
        await createOpenWeatherMap();
        await createMail();
    } catch (error) {
        console.error('Erreur lors de la création de services:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export { createServices };
