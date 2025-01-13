import { useEffect, useState } from "react";
import { Action, createPlum, getActions, getTriggers, Trigger, updatePlum } from "../../services/Plums/plums";
import Navbar from "../../components/Navbar/navbar";
import WorkflowStep from "../../components/Create/workflowStep";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import plus from '../../assets/icons/plus.svg'

interface Workflow {
    title: string;
    description: string;
}

function CreatePage() {

    const location = useLocation();
    const { plum } = location.state || {};

    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const [triggersProviders, setTriggersProviders] = useState<string[]>([]);

    const [actions, setActions] = useState<Action[]>([]);
    const [actionsProviders, setActionsProviders] = useState<string[]>([]);

    const [triggerCreate, setTriggerCreate] = useState<Trigger | null>(null);
    const [actionCreate, setActionCreate] = useState<Action | null>(null);

    const [plumName, setPlumName] =  useState<string>("");

    useEffect(() => {
        if (plum) {
            setPlumName(plum.name);
            setTriggerCreate(plum.trigger);
            setActionCreate(plum.action);
        }
    }, [plum]);

    const [isCreated, setIsCreated] = useState<boolean>(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (triggers.length > 0 && triggersProviders.length === 0) {
            const uniqueProviders = new Set(triggersProviders);
            triggers.forEach((trigger) => {
                if (trigger.provider && !uniqueProviders.has(trigger.provider)) {
                    uniqueProviders.add(trigger.provider);
                }
            });

            setTriggersProviders(Array.from(uniqueProviders));
        }
    }, [triggers, triggersProviders]);

    useEffect(() => {
        if (actions.length > 0 && actionsProviders.length === 0) {
            const uniqueProviders = new Set(actionsProviders);
            actions.forEach((action) => {
                if (action.provider && !uniqueProviders.has(action.provider)) {
                    uniqueProviders.add(action.provider);
                }
            });

            setActionsProviders(Array.from(uniqueProviders));
        }
    }, [actions, actionsProviders]);

    // Workflow steps
    const [workflows, setWorkflows] = useState<Workflow[]>([
        { title: "Trigger", description: "Select the event for your Plum" },
        { title: "Action", description: "Select the event to run" },
    ]);

    // Add a new workflow step
    const handleCreateButton = (index : number) => {
        setWorkflows((prevWorkflows) => {
            const newWorkflows = [...prevWorkflows];
            newWorkflows.splice(index + 1, 0, { title: "Action", description: "Select the event to run" });
            return newWorkflows;
        });
    }

    // Create the Plum
    const createThePlum = () => {
        if (plumName === "" || !triggerCreate || !actionCreate) {
            return;
        }
        if (plum) {
            updatePlum(plum.id, plumName, triggerCreate, actionCreate);
        } else {
            createPlum(plumName, triggerCreate, actionCreate);
        }
        setIsCreated(true);
        setPlumName("");
        setTriggerCreate(null);
        setActionCreate(null);
    }

    // Render the workflow steps
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {!isCreated && (
                <div className="flex flex-1 mt-36 pb-3 justify-center">
                    <div className="max-w-2xl w-full px-6">

                        <label
                            htmlFor="name"
                            className="block text-sm font-bold font-inter text-gray-700"
                        >
                            Plum name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name of your Plum"
                            className="mt-1 mb-5 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-customGreen focus:border-customGreen"
                            defaultValue={plumName}
                            onChange={(e) => setPlumName(e.target.value)}
                        />

                        {workflows.map((workflow, index) => (
                            <div key={index}>
                                <WorkflowStep
                                    stepNumber={index + 1}
                                    title={workflow.title}
                                    description={workflow.description}
                                    {...index === 0 ? { providers: triggersProviders } : { providers: actionsProviders }}
                                    triggers={triggers}
                                    actions={actions}
                                    setTriggerCreate={setTriggerCreate}
                                    setActionCreate={setActionCreate}
                                    triggerCreate={triggerCreate}
                                    actionCreate={actionCreate}
                                    plum={plum}
                                />
                                {index < workflows.length - 1 && (
                                    <div className="flex flex-col items-center">
                                        <div className="w-px h-8 bg-customLightGreen"></div>
                                        <button
                                            className="flex items-center justify-center w-8 h-8 border-2 border-customLightGreen text-customLightGreen rounded-full hover:shadow-custom"
                                            aria-label="Add Step"
                                            onClick={() => handleCreateButton(index)}
                                            disabled={true}
                                        >
                                            +
                                        </button>
                                        <div className="w-px h-8 bg-customLightGreen"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {(plumName === "" || !triggerCreate || !actionCreate) && (
                            <button className="mt-5 w-full transition rounded-full border-2 border-gray-400 px-10 py-2"
                                disabled={true}>
                                <p className="flex justify-center text-xl font-inter">
                                    <img
                                        src={plus}
                                        alt="plus"
                                        className="w-[24px] h-[24px] mr-[9px]"
                                    />
                                    Create
                                </p>
                            </button>
                        )}
                        {(plumName !== "" && triggerCreate && actionCreate && !plum) && (
                            <button className="mt-5 w-full hover:bg-gray-100 transition rounded-full border-2 border-customLightGreen hover:shadow-custom px-10 py-2"
                                onClick={() => createThePlum()}
                                disabled={plumName === "" || !triggerCreate || !actionCreate}>
                                <p className="flex justify-center text-xl font-inter">
                                    <img
                                        src={plus}
                                        alt="plus"
                                        className="w-[24px] h-[24px] mr-[9px]"
                                    />
                                    Create
                                </p>
                            </button>
                        )}
                        {(plumName !== "" && triggerCreate && actionCreate && plum) && (

                            <button className="mt-5 w-full hover:bg-gray-100 transition rounded-full border-2 border-customLightGreen hover:shadow-custom px-10 py-2"
                                onClick={() => createThePlum()}
                                disabled={plumName === "" || !triggerCreate || !actionCreate}>
                                <p className="flex justify-center text-xl font-inter">
                                    <img
                                        src={plus}
                                        alt="plus"
                                        className="w-[24px] h-[24px] mr-[9px]"
                                    />
                                    Update
                                </p>
                            </button>
                        )}
                    </div>
                </div>
            )}
            {isCreated && (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <h1 className="text-3xl text-customGreen font-abrilFatface mb-5">
                            Your Plums has been successfully created!
                        </h1>
                        <div className="">
                            <button
                                className="mx-2 p-6 bg-customGreen text-customLightBlue py-2 rounded-md hover:bg-customDarkGreen"
                                onClick={() => setIsCreated(false)}
                            >
                                New Plum
                            </button>
                            <button
                                className="mx-2 p-6 bg-customGreen text-customLightBlue py-2 rounded-md hover:bg-customDarkGreen"
                                onClick={() => navigate('/myPlums')}
                            >
                                Your Plums
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CreatePage;
