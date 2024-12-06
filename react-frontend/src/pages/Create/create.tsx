import Navbar from "../../components/Navbar/navbar";

function CreatePage() {
  return (
    <div>
        {/* <Navbar></Navbar> TODO: Decomment this when CSS of the page done*/}
        <h1>Create a plum</h1>
        <select name="pets" id="pet-select">
            <option value="">--Action--</option>
            <option value="test">Test</option>
        </select>
        <input type='area' className="bg-customYellow"></input>
        <select name="pets" id="pet-select">
            <option value="">--Reaction--</option>
            <option value="test">Test</option>
        </select>
        <input type='area' className="bg-customYellow"></input>

        <button type="button" className="bg-customGreen" >Create</button>

    </div>
    );
}

export default CreatePage;
