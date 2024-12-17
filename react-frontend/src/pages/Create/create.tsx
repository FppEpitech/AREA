// import { useEffect, useState } from "react";
// // import Navbar from "../../components/Navbar/navbar";
// import { getTriggers, Trigger, getActions, Action, createPlum } from "../../services/Plums/plums";

// function CreatePage() {

//     const [triggers, setTriggers] = useState<Trigger[]>([]);
//     const [selectTrigger, setSelectTrigger] = useState<Trigger | undefined>(undefined);
//     const [actions, setActions] = useState<Action[]>([]);
//     const [selectAction, setSelectAction] = useState<Action | undefined>(undefined);

//     useEffect(() => {
//         const fetchTriggers = async () => {
//             try {
//                 const triggerData = await getTriggers();
//                 if (triggerData) setTriggers(triggerData);
//             } catch (error) {
//                 console.error("Error fetching triggers:", error);
//             }
//         };

//         fetchTriggers();
//     }, []);

//     useEffect(() => {
//         const fetchActions = async () => {
//             try {
//                 const actionData = await getActions();
//                 if (actionData) setActions(actionData);
//             } catch (error) {
//                 console.error("Error fetching actions:", error);
//             }
//         };

//         fetchActions();
//     }, []);

//     const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, value : any[], setter: React.Dispatch<React.SetStateAction<any | undefined>>) => {
//         const selectedName = event.target.value;
//         const selected = value.find(trigger => trigger.name === selectedName);
//         setter(selected);
//     };

//     const handleCreateButton = () => {
//         if (selectTrigger && selectAction)
//             createPlum(selectTrigger, selectAction);
//     }

//     return (
//     <div>
//         {/* <Navbar></Navbar> TODO: Decomment this when CSS of the page done*/}
//         <h1>Create a plum</h1>
//         <select name="triggers" id="triggers-select" onChange={(e) => handleSelectChange(e, triggers, setSelectTrigger)}>
//             <option value="">--Triggers--</option>
//             {triggers && triggers.map((trigger) => (
//                 <option value={trigger.name} key={trigger.id}>{trigger.name}</option>
//             ))}
//         </select>
//         <input
//             type='area'
//            className="bg-customYellow w-full h-48 p-4 text-lg border border-gray-300 rounded-md resize-none"
//             value={selectTrigger?.json || ""}
//             onChange={(e) => {if (selectTrigger) setSelectTrigger({id: selectTrigger.id, name: selectTrigger.name, json: e.target.value})}}
//             >
//             </input>
//         <select name="actions" id="actions-select"  onChange={(e) => handleSelectChange(e, actions, setSelectAction)}>
//             <option value="">--Actions--</option>
//             {actions && actions.map((action) => (
//                 <option value={action.name} key={action.id}>{action.name}</option>
//             ))}
//         </select>
//         <input
//             type='area'
//             className="bg-customYellow w-full h-48 p-4 text-lg border border-gray-300 rounded-md resize-none"
//             value={selectAction?.json || ""}
//             onChange={(e) => {if (selectAction) setSelectAction({id: selectAction.id, name: selectAction.name, json: e.target.value})}}
//             >
//             </input>

//         <button
//             type="button"
//             className="bg-customGreen"
//             onClick={handleCreateButton}
//             >
//             Create
//         </button>

//     </div>
//     );
// }

// export default CreatePage;


import React, { useEffect, useState } from "react";
import { Action, getActions, getTriggers, Trigger } from "../../services/Plums/plums";
import Navbar from "../../components/Navbar/navbar";

interface WorkflowStepProps {
    stepNumber: number;
    title: string;
    description: string;
    providers?: string[];
}

interface Workflow {
title: string;
description: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ stepNumber, title, description, providers }) => {
    return (
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-custom hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="columns-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <select
                    name="workflow-options"
                    id="workflow-options"
                    className="block w-full p-2 mt-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-white dark:border-gray-600"
                >
                    <option value="">{title}</option>
                    {providers && providers.map((provider) => (
                        <option value={provider} key={provider}>{provider}</option>
                    ))}
                </select>
            </div>

            <p className="font-normal text-gray-700 font-instrumentSans dark:text-gray-400">{stepNumber}. {description}</p>
        </div>
    );
};

function CreatePage() {

    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const [triggersProviders, setTriggersProviders] = useState<string[]>([]);

    const [actions, setActions] = useState<Action[]>([]);
    const [actionsProviders, setActionsProviders] = useState<string[]>([]);

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
            <div className="flex flex-1 mt-36 justify-center">
                <div className="max-w-md w-full">
                    {workflows.map((workflow, index) => (
                        <div key={index} className="pl-6 pr-6 last:mb-0">
                            <WorkflowStep
                                stepNumber={index + 1}
                                title={workflow.title}
                                description={workflow.description}
                                {...index === 0 ? { providers: triggersProviders } : { providers: actionsProviders }}
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
