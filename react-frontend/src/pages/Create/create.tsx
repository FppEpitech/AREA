import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar/navbar";
import { getTriggers, Trigger, getActions, Action, createPlum } from "../../services/Plums/plums";

function CreatePage() {

    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const [selectTrigger, setSelectTrigger] = useState<Trigger | undefined>(undefined);
    const [actions, setActions] = useState<Action[]>([]);
    const [selectAction, setSelectAction] = useState<Action | undefined>(undefined);

    useEffect(() => {
        const fetchTriggers = async () => {
            try {
                const triggerData = await getTriggers();
                if (triggerData) setTriggers(triggerData);
            } catch (error) {
                console.error("Error fetching triggers:", error);
            }
        };

        fetchTriggers();
    }, []);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const actionData = await getActions();
                if (actionData) setActions(actionData);
            } catch (error) {
                console.error("Error fetching actions:", error);
            }
        };

        fetchActions();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, value : any[], setter: React.Dispatch<React.SetStateAction<any | undefined>>) => {
        const selectedName = event.target.value;
        const selected = value.find(trigger => trigger.name === selectedName);
        setter(selected);
    };

    const handleCreateButton = () => {
        if (selectTrigger && selectAction)
            createPlum(selectTrigger, selectAction);
    }

    return (
    <div>
        {/* <Navbar></Navbar> TODO: Decomment this when CSS of the page done*/}
        <h1>Create a plum</h1>
        <select name="triggers" id="triggers-select" onChange={(e) => handleSelectChange(e, triggers, setSelectTrigger)}>
            <option value="">--Triggers--</option>
            {triggers && triggers.map((trigger) => (
                <option value={trigger.name} key={trigger.id}>{trigger.name}</option>
            ))}
        </select>
        <input
            type='area'
            className="bg-customYellow"
            value={selectTrigger?.json || ""}
            onChange={(e) => {if (selectTrigger) setSelectTrigger({id: selectTrigger.id, name: selectTrigger.name, json: e.target.value})}}
            >
            </input>
        <select name="actions" id="actions-select"  onChange={(e) => handleSelectChange(e, actions, setSelectAction)}>
            <option value="">--Actions--</option>
            {actions && actions.map((action) => (
                <option value={action.name} key={action.id}>{action.name}</option>
            ))}
        </select>
        <input
            type='area'
            className="bg-customYellow"
            value={selectAction?.json || ""}
            onChange={(e) => {if (selectAction) setSelectAction({id: selectAction.id, name: selectAction.name, json: e.target.value})}}
            >
            </input>

        <button
            type="button"
            className="bg-customGreen"
            onClick={handleCreateButton}
            >
            Create
        </button>

    </div>
    );
}

export default CreatePage;
