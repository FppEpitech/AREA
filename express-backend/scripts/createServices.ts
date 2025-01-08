import prisma from '../prismaClient';

async function createDiscord() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'Discord',
            name: 'discord',
            description: 'Discord service',
            logo: 'https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg',
        }});
        console.log('service discord created:', service);
    } catch (error) {
        console.error('Erreur lors de la création du service Discord:', error);
    }
}

async function createSpotify() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'Spotify',
            name: 'spotify',
            description: 'Spotify service',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        }});
        console.log('service spotify created:', service);
    } catch (error) {
        console.error('Erreur lors de la création du service Spotify:', error);
    }
}

async function createOpenWeatherMap() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'OpenWeatherMap',
            name: 'openweathermap',
            description: 'OpenWeatherMap service',
            logo: 'https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png',
        }});
        console.log('service openweathermap created:', service);
    } catch (error) {
        console.error('Erreur lors de la création du service OpenWeatherMap:', error);
    }
}

async function createMail() {
    try {
        let service = await prisma.service.create({data: {
            provider: 'Mail',
            name: 'mail',
            description: 'Mail service',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png',
        }});
        console.log('service mail created:', service);
    } catch (error) {
        console.error('Erreur lors de la création du service Mail:', error);
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
