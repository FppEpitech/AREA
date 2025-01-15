import Footer from "../../components/Footer/Footer";
import NavbarWelcome from "../../components/Navbar/navbarWelcome";

import welcomeBackground from "../../assets/welcome/welcome_bg.png";

export default function Contact() {

    const names = [
        {
            name: "Alban Peralta",
            picture: "Avery",
            github: "https://github.com/Peralban",
        },
        {
            name: "Aubane Nourry",
            picture: "Mason",
            github: "https://github.com/AubaneNourry",
        },
        {
            name: "Théophile Jérôme-Rocher",
            picture: "Kingston",
            github: "https://github.com/theophile-jr",
        },
        {
            name: "Mathieu Robert",
            picture: "Nolan",
            github: "https://github.com/mathieurobert1",
        },
        {
            name: "Axel Fradet",
            picture: "Ryan",
            github: "https://github.com/AxelF44",
        },
    ];

    return (
        <div className="relative flex flex-col min-h-screen">
            {/* Background Image */}
            <img
                src={welcomeBackground}
                alt="welcome background"
                className="absolute top-0 right-0 h-screen z-0 object-cover hidden lg:flex"
            />

            {/* Navbar */}
            <NavbarWelcome />

            {/* Header */}
            <div className="mt-48 flex justify-center relative z-10">
                <h1 className="text-4xl bg-white p-6 rounded-[10px] font-abrilFatface text-customGreen mb-6">The dev team</h1>
            </div>

            {/* Middle Section */}
            <div className="mt-9 flex-grow bg-customLightBlue flex justify-center items-center relative z-10">
                <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-5">
                    {names.map((name, index) => (
                        <button
                            key={index}
                            className="m-4 bg-white border-2 border-customLightGreen rounded-lg p-6 flex flex-col items-center"
                            type="button"
                            onClick={() => window.open(name.github)}
                        >
                            <img
                                className="w-full"
                                alt={name.name}
                                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${name.picture}`}
                            />
                            <p className="mt-5 text-center">{name.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="z-10">
                <Footer />
            </div>
        </div>
    );
}
