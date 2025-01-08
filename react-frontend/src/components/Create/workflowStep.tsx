import { useState } from "react";
import { Action, getProvidersActions, getProvidersTriggers, Trigger } from "../../services/Plums/plums";
import WorkflowSetup from "./workflowSetup";

interface WorkflowStepProps {
    stepNumber: number;
    title: string;
    description: string;
    providers?: string[];
    triggers: Trigger[];
    actions: Action[];
    setTriggerCreate: React.Dispatch<React.SetStateAction<Trigger | null>>;
    setActionCreate: React.Dispatch<React.SetStateAction<Action | null>>;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ stepNumber, title, description, providers, actions, triggers, setTriggerCreate, setActionCreate }) => {

    const [selectType, setSelectType] = useState<Trigger[] | Action[] | undefined>(undefined);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>, value : any[], setter: React.Dispatch<React.SetStateAction<any | undefined>>) => {
        const selectedName = event.target.value;
        if (!selectedName) {
            setter(undefined);
            return;
        }

        if (stepNumber === 1) {
            const selected = await getProvidersTriggers(selectedName);
            setSelectType(selected);
        } else {
            const selected = await getProvidersActions(selectedName);
            setSelectType(selected);
        }
    };

    return (
        <div className="block p-6 bg-white font-instrumentSans border border-gray-200 rounded-lg shadow-custom dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="columns-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <select
                    name="workflow-options"
                    id="workflow-options"
                    className="block w-full p-2 mt-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-white dark:border-gray-600"
                    onChange={(e) => handleSelectChange(e, triggers, setSelectType)}
                >
                    <option value="">{title}</option>
                    {providers && providers.map((provider) => (
                        <option value={provider} key={provider}>{provider}</option>
                    ))}
                </select>
            </div>

            <p className="font-normal text-gray-700 dark:text-gray-400">{stepNumber}. {description}</p>

            {
            selectType && selectType.length > 0 && (
                <WorkflowSetup
                    stepNumber={stepNumber}
                    selectType={selectType}
                    setSelectType={setSelectType}
                    setTriggerCreate={setTriggerCreate}
                    setActionCreate={setActionCreate}
                />
            )
        }
        </div>
    );
};

export default WorkflowStep;