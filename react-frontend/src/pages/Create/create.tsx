import { useEffect, useState } from "react";
import { Action, createPlum, getActions, getTriggers, Trigger, updatePlum } from "../../services/Plums/plums";
import Navbar from "../../components/Navbar/navbar";
import WorkflowStep from "../../components/Create/workflowStep";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Workflow {
    title: string;
    description: string;
}

function CreatePage() {

    const location = useLocation();
    const { plum } = location.state || {};
    const { givenTrigger } = location.state || {};
    const { givenAction } = location.state || {};

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
        if (givenTrigger) {
            setPlumName(givenTrigger.name + "...");
            setTriggerCreate(givenTrigger);
        }
        if (givenAction) {
            setPlumName("..." + givenAction.name);
            setActionCreate(givenAction);
        }
    }, [plum, givenTrigger, givenAction]);

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
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {!isCreated && (
                <div className="flex flex-1 mt-36 pb-3 justify-center">
                    <div className="max-w-md w-full">

                        <input
                            type="text"
                            className="w-full mb-7 text-xl px-6"
                            placeholder="Name of your Plum"
                            defaultValue={plumName}
                            onChange={(e) => setPlumName(e.target.value)}
                        >
                        </input>

                        {workflows.map((workflow, index) => (
                            <div key={index} className="pl-6 pr-6 last:mb-0">
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
                                    givenTrigger={givenTrigger}
                                    givenAction={givenAction}
                                />
                                {index < workflows.length - 1 && (
                                    <div className="flex flex-col items-center">
                                        <div className="w-px h-8 bg-gray-300"></div>
                                        <button
                                            className="flex items-center justify-center w-8 h-8 text-white bg-customGreen shadow-custom rounded-full hover:bg-customDarkGreen"
                                            aria-label="Add Step"
                                            onClick={() => handleCreateButton(index)}
                                            disabled={true}
                                        >
                                            +
                                        </button>
                                        <div className="w-px h-8 bg-gray-300"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {(plumName === "" || !triggerCreate || !actionCreate) && (
                            <button
                                className="p-6 bg-gray-400 text-customLightBlue py-2 rounded-md"
                                disabled={true}
                            >
                                Create
                            </button>
                        )}
                        {(plumName !== "" && triggerCreate && actionCreate && !plum) && (
                            <button
                            className="p-6 bg-customGreen text-customLightBlue py-2 rounded-md hover:bg-customDarkGreen"
                            onClick={() => createThePlum()}
                            disabled={plumName === "" || !triggerCreate || !actionCreate}
                            >
                                Create
                            </button>
                        )}
                        {(plumName !== "" && triggerCreate && actionCreate && plum) && (
                            <button
                            className="p-6 bg-customGreen text-customLightBlue py-2 rounded-md hover:bg-customDarkGreen"
                            onClick={() => createThePlum()}
                            disabled={plumName === "" || !triggerCreate || !actionCreate}
                            >
                                Update
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
        </div>
    );
};

export default CreatePage;
