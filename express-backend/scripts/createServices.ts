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
        console.error('Error during creation of Discord service:', error, '. It may already exist.');
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
        console.log('Error during creation of Spotify service:', error, '. It may already exist.');
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
        console.log('Error during creation of OpenWeatherMap service:', error, '. It may already exist.');
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
        console.log('Error during creation of Mail service:', error, '. It may already exist.');
    }
}

async function createWorldTime() {
    try {
        let service = await prisma.service.create({data: {
                provider: 'WorldTime',
                name: 'worldtime',
                color: '#4b8424',
                description: 'WorldTime service',
                logo: 'https://cdn-icons-png.flaticon.com/512/109/109613.png',
            }});
        console.log('service mail created:');
    } catch (error) {
        console.log('Error during creation of world service:', error, '. It may already exist.');
    }
}

async function createServices() {
    try {
        await createDiscord();
        await createSpotify();
        await createOpenWeatherMap();
        await createMail();
        await createWorldTime();
    } catch (error) {
        console.log('Error during creation of service:', error, '. It may already exist.');
    } finally {
        await prisma.$disconnect();
    }
}

export { createServices };
