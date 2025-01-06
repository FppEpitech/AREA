import { useEffect, useState } from "react";
import { Action, getActions, getTriggers, Trigger } from "../../services/Plums/plums";
import Navbar from "../../components/Navbar/navbar";
import WorkflowSetup from "../../components/Create/workflowSetup";
import WorkflowStep from "../../components/Create/workflowStep";

interface Workflow {
    title: string;
    description: string;
}

function CreatePage() {

    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const [triggersProviders, setTriggersProviders] = useState<string[]>([]);

    const [actions, setActions] = useState<Action[]>([]);
    const [actionsProviders, setActionsProviders] = useState<string[]>([]);

    const [selectType, setSelectType] = useState<Trigger[] | Action[] | undefined>(undefined);

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

    // Render the workflow steps
    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Centered Workflow */}
            <div className="flex flex-1 mt-36 pb-3 justify-center">
                <div className="max-w-md w-full">
                    {workflows.map((workflow, index) => (
                        <div key={index} className="pl-6 pr-6 last:mb-0">
                            <WorkflowStep
                                stepNumber={index + 1}
                                title={workflow.title}
                                description={workflow.description}
                                {...index === 0 ? { providers: triggersProviders } : { providers: actionsProviders }}
                                triggers={triggers}
                                actions={actions}
                                selectType={selectType}
                                setSelectType={setSelectType}
                            />
                            {index < workflows.length - 1 && (
                                <div className="flex flex-col items-center">
                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <button
                                        className="flex items-center justify-center w-8 h-8 text-white bg-customGreen shadow-custom rounded-full hover:bg-customDarkGreen"
                                        aria-label="Add Step"
                                        onClick={() => handleCreateButton(index)}
                                    >
                                        +
                                    </button>
                                    <div className="w-px h-8 bg-gray-300"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
