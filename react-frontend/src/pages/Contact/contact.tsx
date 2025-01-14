import Footer from "../../components/Footer/Footer";

export default function Contact() {

    const names = [
        {
            name: "Alban Peralta",
            picture: "Avery"
        },
        {
            name: "Aubane Nourry",
            picture: "Mason"
        },
        {
            name: "Théophile Jérôme-Rocher",
            picture: "Kingston"
        },
        {
            name: "Mathieu Robert",
            picture: "Nolan"
        },
        {
            name: "Axel Fradet",
            picture: "Ryan"
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="mt-48 flex justify-center">
                <h1 className="text-4xl font-abrilFatface text-customGreen mb-6">The dev team</h1>
            </div>

            {/* Middle Section */}
            <div className="mt-9 flex-grow bg-customLightBlue flex justify-center items-center">
                <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-5">
                    {names.map((name, index) => (
                        <div
                            key={index}
                            className="m-4 bg-white border-2 border-customLightGreen rounded-lg p-6 flex flex-col items-center"
                        >
                            <img
                                className=" w-full"
                                alt={name.name}
                                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${name.picture}`}
                            />
                            <p className="mt-5 text-center">{name.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );

}
