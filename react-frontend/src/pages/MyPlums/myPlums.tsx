import { useState } from "react";
// import Navbar from "../../components/Navbar/navbar";

export default function MyPlums() {

    const [myPlums, setMyPlums] = useState(["Default"]);

    const sendLogin = async() => {
        // TODO : await setMyPlums(getMyPlums());
        // Get all plums thanks to the /plums API route
    };

    return(
        <div>
            {/* <Navbar></Navbar> TODO : decomment this part when CSS done */}
            <h1>My Plums</h1>
            <input type="search" placeholder="Filter"></input>
            {
                myPlums.map((card, index) => (
                    <div>
                        <h2>{index + 1}</h2>
                        <input type="area" disabled value={card}></input>
                    </div>
                ))
            }
        </div>
    );
}
