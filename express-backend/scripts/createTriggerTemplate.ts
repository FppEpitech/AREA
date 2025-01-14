import prisma from '../prismaClient';

async function PressureTriggerTemplate() {
    try {
        const triggerPressTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'Pressure',
                provider: 'OpenWeatherMap',
                type: 'cron',
                trigFunc: 'pressure',
                valueTemplate: {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    pressure: {
                        value: 0, // Atmospheric pressure on the sea level in hPa
                        type: 'number',
                        check: 'Greater than 0'
                    },
                    city: {
                        value: 'Nantes',
                        type: 'string',
                        check: 'city'
                    },
                    country: {
                        value: 'FR',
                        type: 'string',
                        check: 'country'
                    },
                    condition: {
                        value: {
                            0: "Less than",
                            1: "Greater than",
                            2: "Equal"
                        },
                        type: 'radiobutton',
                        result: 0,
                    },
                },
            },
        });
        console.log('TriggerTemplate \'Less than temperature\' created:', triggerPressTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function temperatureTriggerTemplate() {
    try {
        const triggerTempTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'Temperature',
                provider: 'OpenWeatherMap',
                type: 'cron',
                trigFunc: 'temperature',
                valueTemplate: {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    temperature: {
                        value: 0,
                        type: 'number',
                    },
                    city: {
                        value: 'Nantes',
                        type: 'string',
                        check: 'city'
                    },
                    country: {
                        value: 'FR',
                        type: 'string',
                        check: 'country'
                    },
                    condition: {
                        value: {
                            0: "Less than",
                            1: "Greater than",
                            2: "Equal"
                        },
                        type: 'radiobutton',
                        result: 0,
                    },
                },
            },
        });
        console.log('TriggerTemplate \'Temperature\' created:', triggerTempTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function cloudinessTriggerTemplate() {
    try {
        const triggerCloudTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'Cloudiness',
                provider: 'OpenWeatherMap',
                type: 'cron',
                trigFunc: 'cloudiness',
                valueTemplate: {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    cloudiness: {
                        value: 0,
                        type: 'number',
                        check: '%'
                    },
                    city: {
                        value: 'Nantes',
                        type: 'string',
                        check: 'city'
                    },
                    country: {
                        value: 'FR',
                        type: 'string',
                        check: 'country'
                    },
                    condition: {
                        value: {
                            0: "Less than",
                            1: "Greater than",
                            2: "Equal"
                        },
                        type: 'radiobutton',
                        result: 0,
                    },
                },
            },
        });
        console.log('TriggerTemplate \'Cloudiness\' created:', triggerCloudTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function windSpeedTriggerTemplate() {
    try {
        const triggerWSTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'Wind Speed',
                provider: 'OpenWeatherMap',
                type: 'cron',
                trigFunc: 'windSpeed',
                valueTemplate: {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    windSpeed: {
                        value: 0, // Wind speed in meter/sec
                        type: 'number',
                        check: 'Greater than 0'
                    },
                    city: {
                        value: 'Nantes',
                        type: 'string',
                        check: 'city'
                    },
                    country: {
                        value: 'FR',
                        type: 'string',
                        check: 'country'
                    },
                    condition: {
                        value: {
                            0: "Less than",
                            1: "Greater than",
                            2: "Equal"
                        },
                        type: 'radiobutton',
                        result: 0,
                    },
                },
            },
        });
        console.log('TriggerTemplate \'Wind Speed\' created:', triggerWSTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function humidityTriggerTemplate() {
    try {
        const triggerHumTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'Humidity',
                provider: 'OpenWeatherMap',
                type: 'cron',
                trigFunc: 'humidity',
                valueTemplate: {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    humidity: {
                        value: 0,
                        type: 'number',
                        check: '%'
                    },
                    city: {
                        value: 'Nantes',
                        type: 'string',
                        check: 'city'
                    },
                    country: {
                        value: 'FR',
                        type: 'string',
                        check: 'country'
                    },
                    condition: {
                        value: {
                            0: "Less than",
                            1: "Greater than",
                            2: "Equal"
                        },
                        type: 'radiobutton',
                        result: 0,
                    },
                },
            },
        });
        console.log('TriggerTemplate \'Humidity\' created:', triggerHumTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function weatherTriggerTemplate() {
    try {
        const triggerWeatherTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'Weather',
                provider: 'OpenWeatherMap',
                type: 'cron',
                trigFunc: 'weather',
                valueTemplate: {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    city: {
                        value: 'Nantes',
                        type: 'string',
                        check: 'city'
                    },
                    country: {
                        value: 'FR',
                        type: 'string',
                        check: 'country'
                    },
                    condition: {
                        value: {
                            0: "clear sky",
                            1: "few clouds",
                            2: "scattered clouds",
                            3: "broken clouds",
                            4: "shower rain",
                            5: "rain",
                            6: "thunderstorm",
                            7: "snow",
                            8: "mist"
                        },
                        type: 'radiobutton',
                        result: 0,
                    },
                },
            },
        });
        console.log('TriggerTemplate \'Weather\' created:', triggerWeatherTemplate);

    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function isSpotifyNewLikeTriggerTemplate() {
  try {
      const triggerEqualTemplate = await prisma.triggerTemplate.create({
      data: {
          name: 'Spotify new like',
          provider: 'Spotify',
          type: 'cron',
          trigFunc: 'spotifyNewLike',
          valueTemplate: {
              time: {
                  value: '* * * * *',
                  type: 'CRON expression',
              }
          },
      },
      });
      console.log('TriggerTemplate \'Spotify new like\' created:', triggerEqualTemplate);

  } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate:', error);
  } finally {
      await prisma.$disconnect();
  }
}

async function isSpotifyMusicPlayingTriggerTemplate() {
  try {
      const triggerEqualTemplate = await prisma.triggerTemplate.create({
      data: {
          name: 'Spotify music playing',
          provider: 'Spotify',
          type: 'cron',
          trigFunc: 'isSpotifyMusicPlaying',
          valueTemplate: {
              time: {
                  value: '* * * * *',
                  type: 'CRON expression',
              }
          },
      },
      });
      console.log('TriggerTemplate \'Spotify music playing\' created:', triggerEqualTemplate);

  } catch (error) {
      console.error('Erreur lors de la création du ActionTemplate:', error);
  } finally {
      await prisma.$disconnect();
  }
}

async function isSpotifyMusicPausingTriggerTemplate() {
    try {
        const triggerEqualTemplate = await prisma.triggerTemplate.create({
        data: {
            name: 'Spotify music pausing',
            provider: 'Spotify',
            type: 'cron',
            trigFunc: 'isSpotifyMusicPausing',
            valueTemplate: {
                time: {
                    value: '* * * * *',
                    type: 'CRON expression',
                }
            },
        },
        });
        console.log('TriggerTemplate \'Spotify music pausing\' created:', triggerEqualTemplate);
  
    } catch (error) {
        console.error('Erreur lors de la création du ActionTemplate:', error);
    } finally {
        await prisma.$disconnect();
    }
  }

async function worldTimeTriggerTemplate() {
    try {
        const triggerTimeTemplate = await prisma.triggerTemplate.create({
            data: {
                name: 'World Time',
                provider: 'WorldTimeAPI',
                type: 'cron',
                trigFunc: 'isWorldTime',
                valueTemplate: {
                    year: {
                        value: 2025,
                        type: 'number',
                    },
                    month: {
                        value: 1,
                        type: 'number',
                        check: '1-12',
                    },
                    day: {
                        value: 1,
                        type: 'number',
                        check: '1-31',
                    },
                    hour: {
                        value: 0,
                        type: 'number',
                        check: '0-23',
                    },
                    minute: {
                        value: 0,
                        type: 'number',
                        check: '0-59',
                    },
                    continent: {
                        value: 'Europe',
                        type: 'string',
                        check: 'continent',
                    },
                    city: {
                        value: 'Paris',
                        type: 'string',
                        check: 'city',
                    }
                },
            },
        });
        console.log('TriggerTemplate \'World Time\' created:', triggerTimeTemplate);

    } catch (error) {
        console.error('Error during creation of trigger template:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export { PressureTriggerTemplate, temperatureTriggerTemplate, cloudinessTriggerTemplate, windSpeedTriggerTemplate, humidityTriggerTemplate, weatherTriggerTemplate, isSpotifyNewLikeTriggerTemplate, isSpotifyMusicPlayingTriggerTemplate, isSpotifyMusicPausingTriggerTemplate, worldTimeTriggerTemplate };
