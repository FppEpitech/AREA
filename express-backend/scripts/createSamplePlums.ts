import prisma from '../prismaClient';

async function createWeatherSamplePlum() {
    try {
        await prisma.samplePlums.create({
            data: {
                name: "Send me message if below 0° at Nantes in France",
                triggerValue: {
                    time: {
                        value: "* * * * *",
                        type: "CRON expression"
                    },
                    temperature: {
                        value: 0,
                        type: "number"
                    },
                    city: {
                        value: "Nantes",
                        type: "string",
                        check: "city"
                    },
                    country: {
                        value: "FR",
                        type: "string",
                        check: "country"
                    },
                    condition: {
                        value: {
                            0: "Less than",
                            1: "Greater than",
                            2: "Equal"
                        },
                        type: "radiobutton",
                        result: 0
                    }
                },
                triggerTemplateName: "Temperature",
                triggerTemplateProvider: "OpenWeatherMap",
                actionValue: {
                    webhookUrl: {
                        value: "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL",
                        type: "string"
                    },
                    content: {
                        value: "Warning, the temperature is actually below 0° in Nantes, France.",
                        type: "string"
                    }
                },
                actionTemplateName: "Send Discord Message",
                actionTemplateProvider: "Discord",
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function createsendADiscordMessageIfTramwayIsClose() {
    try {
        await prisma.samplePlums.create({
            data: {
                name: "Send me message if tramway is close",
                triggerValue:  {
                    time: {
                        value: '* * * * *',
                        type: 'CRON expression',
                    },
                    codeSite: {
                        value: {
                            "ADEL": "Aimé Delrue",
                            "BALI": "Balinière",
                            "BDOU": "Bd de Doulon",
                            "BJOI": "Beaujoire",
                            "BLVU": "Mendès France - Bellevue",
                            "BNON": "Bignon",
                            "BOFA": "Bouffay",
                            "BOGE": "Bourgeonnière",
                            "BOSI": "Boissière",
                            "BRTA": "Bretagne",
                            "BSEJ": "Beauséjour",
                            "CDAN": "Chêne des Anglais",
                            "CNAV": "Chantiers Navals",
                            "COET": "Les Couëts",
                            "COMM": "Commerce",
                            "CREZ": "Château de Rezé",
                            "CRQU": "Place du Cirque",
                            "DCAN": "Duchesse Anne - Château",
                            "DCFF": "Du Chaffault",
                            "DIDE": "Espace Diderot",
                            "ECSU": "École Centrale - Audencia",
                            "EGLI": "Égalité",
                            "FACU": "Facultés",
                            "FERI": "Ferrière",
                            "FFAU": "Félix Faure",
                            "FMIT": "François Mitterrand",
                            "FRAC": "Frachon",
                            "GDOU": "Grande Ouche",
                            "GMAR": "Gare Maritime",
                            "GPRO": "Gare de Pont Rousseau",
                            "GSNO": "Gare Nord - Jardin des Plantes",
                            "HALU": "Haluchère - Batignolles",
                            "HAVE": "Halvêque",
                            "HBLI": "Hôpital Bellier",
                            "HODI": "Hôtel Dieu",
                            "JAME": "Jamet",
                            "JJNA": "Jean Jaurès",
                            "JMLI": "Jean Moulin",
                            "JROS": "Jean Rostand",
                            "LAUR": "Lauriers",
                            "LCAR": "Le Cardo",
                            "LDRE": "Landreau",
                            "LONG": "Longchamp",
                            "MAI8": "8 Mai",
                            "MDOU": "Mairie de Doulon",
                            "MDTH": "Médiathèque",
                            "MGIN": "Mangin",
                            "MICH": "Michelet - Sciences",
                            "MNFA": "Manufacture",
                            "MORH": "Morrhonnière - Petit Port",
                            "MOTE": "Motte Rouge",
                            "MOUT": "Moutonnerie",
                            "MPAU": "Marcel Paul",
                            "NETR": "Neustrie",
                            "NRDA": "Neruda",
                            "OGVA": "Orvault Grand Val",
                            "OMRL": "Orvault Morlière",
                            "OTAG": "50 Otages",
                            "PIRM": "Pirmil",
                            "PISE": "Pin Sec",
                            "POIT": "Poitou",
                            "PROU": "Pont Rousseau - Martyrs",
                            "PSCE": "Plaisance",
                            "RAZA": "Ranzay",
                            "RCAS": "René Cassin",
                            "RMNE": "Romanet",
                            "RROL": "Romain Rolland",
                            "RTSC": "Recteur Schmitt",
                            "RVAN": "Rond-Point de Vannes",
                            "SADU": "Santos Dumont",
                            "SECH": "Schoelcher",
                            "SFEL": "St-Félix",
                            "SILL": "Sillon de Bretagne",
                            "SMHI": "St-Mihiel",
                            "SOUI": "Souillarderie",
                            "STHR": "Alexandre Vincent - Ste-Thérèse",
                            "TENA": "Tertre",
                            "TMLI": "Tourmaline",
                            "TROC": "Trocardière",
                            "VGAC": "Vincent Gâche",
                            "VIAR": "Viarme-Talensac",
                            "WATT": "Wattignies",
                            "XBON": "Croix Bonneau"
                        },
                        type: 'search dropdown',
                        result: 'GMAR'
                    },
                    tramLine: {
                        value: {
                            "1": "Tramway ligne 1",
                            "2": "Tramway ligne 2",
                            "3": "Tramway ligne 3"
                        },
                        type: 'search dropdown',
                        result: '1'
                    },
                    tramTerminus: {
                        value: {
                            "François Mitterrand": "François Mitterrand",
                            "Jamet": "Jamet",
                            "Beaujoire": "Beaujoire",
                            "Ranzay": "Ranzay",
                            "Orvault Grand Val": "Orvault Grand Val",
                            "Gare de Pont Rousseau": "Gare de Pont Rousseau",
                            "Espace Diderot": "Espace Diderot",
                            "Marcel Paul": "Marcel Paul",
                            "Neustrie": "Neustrie"
                        },
                        type: 'search dropdown',
                        result: 'Beaujoire'
                    },
                    closeTime: {
                        value: 7,
                        type: 'number',
                        check: 'Greater than 0'
                    },
                },
                triggerTemplateName: "Tramway is close",
                triggerTemplateProvider: "Noalib",
                actionValue: {
                    webhookUrl: {
                        value: "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL",
                        type: "string"
                    },
                    content: {
                        value: "The tramway is 7min close, you have to leave now if you don't want to miss it.",
                        type: "string"
                    }
                },
                actionTemplateName: "Send Discord Message",
                actionTemplateProvider: "Discord",
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function createSamplePlums() {
    const samplePlums = await prisma.samplePlums.findMany();
    if (samplePlums.find(samplePlum => samplePlum.name === "Send me message if below 0° at Nantes in France") === undefined)
        await createWeatherSamplePlum();
    if (samplePlums.find(samplePlum => samplePlum.name === "Send me message if tramway is close") === undefined)
        await createsendADiscordMessageIfTramwayIsClose();
}
