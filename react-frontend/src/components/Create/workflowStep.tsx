import { useEffect, useState } from "react";
import { Action, getProvidersActions, getProvidersTriggers, Trigger } from "../../services/Plums/plums";
import WorkflowSetup from "./workflowSetup";
import { Plum } from "../../pages/MyPlums/myPlums";

import trashSvg from '../../assets/icons/trash.svg';

interface WorkflowStepProps {
    stepNumber: number;
    title: string;
    description: string;
    providers?: string[];
    triggers: Trigger[];
    actions: Action[];
    setTriggerCreate: React.Dispatch<React.SetStateAction<Trigger | null>>;
    setActionCreate: React.Dispatch<React.SetStateAction<Action | null>>;
    triggerCreate: Trigger | null;
    actionCreate: Action | null;
    plum: Plum;
    givenTrigger?: Trigger;
    givenAction?: Action;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ stepNumber, title, description, providers, actions, triggers, setTriggerCreate, setActionCreate, triggerCreate, actionCreate, plum, givenTrigger, givenAction }) => {

    const [selectType, setSelectType] = useState<Trigger[] | Action[] | undefined>(undefined);
    const [selectedProvider, setSelectedProvider] = useState<string>(title);

    useEffect(() => {
        const updateSelections = async () => {
            if (plum) {
                if (stepNumber === 1) {
                    const trigger = triggers.find((trigger) => trigger.name === plum.trigger.triggerTemplate.name && trigger.provider === plum.trigger.triggerTemplate.provider) ?? null;
                    const selected = await getProvidersTriggers(plum.trigger.triggerTemplate.provider);
                    if (trigger) {
                        try {
                            trigger.valueTemplate = plum.trigger.triggerValue;
                            setTriggerCreate(trigger);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    setSelectType(selected);
                    setSelectedProvider(plum.trigger.triggerTemplate.provider);
                } else {
                    const action = actions.find((action) => action.name === plum.action.actionTemplate.name && action.provider === plum.action.actionTemplate.provider) ?? null;
                    const selected = await getProvidersActions(plum.action.actionTemplate.provider);
                    if (action) {
                        try {
                            action.valueTemplate = plum.action.actionValue;
                            setActionCreate(action);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    setSelectType(selected);
                    setSelectedProvider(plum.action.actionTemplate.provider);
                }
            } else if (givenTrigger && stepNumber === 1) {
                const selected = await getProvidersTriggers(givenTrigger.provider);
                setSelectType(selected);
                setSelectedProvider(givenTrigger.provider);
            } else if (givenAction && stepNumber !== 1) {
                const selected = await getProvidersActions(givenAction.provider);
                setSelectType(selected);
                setSelectedProvider(givenAction.provider);

            }
        };
        updateSelections();
    }, [plum, triggers, actions, givenTrigger, givenAction]);

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

        setSelectedProvider(selectedName);
    };

    const clear = () => {
        setSelectType(undefined);
        setSelectedProvider(title);
        if (stepNumber === 1) {
            setTriggerCreate(null);
        } else {
            setActionCreate(null);
        }
    }

    return (
        <div className="block p-6 bg-white font-inter border-2 border-customLightGreen rounded-lg">
            <div className="columns-2">
                <div className="form-group">
                    <label
                        htmlFor="workflow-options"
                        className="mb-2 text-2xl font-bold font-inter tracking-tight text-gray-900 dark:text-white">{title}
                    </label>
                    <select
                        name="workflow-options"
                        id="workflow-options"
                        className="block w-full p-2 mt-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleSelectChange(e, triggers, setSelectType)}
                        value={selectedProvider}
                    >
                        <option value={title}>{title}</option>
                        {providers && providers.map((provider) => (
                            <option value={provider} key={provider}>{provider}</option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="flex justify-between">
                <p className="font-normal text-gray-700 dark:text-gray-400">{stepNumber}. {description}</p>
                <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => clear()}
                >
                    <img
                        src={trashSvg}
                        alt="trash"
                        className="w-[20px] h-[20px]"
                    />
                </button>
            </div>

            {
            selectType && selectType.length > 0 && (
                <WorkflowSetup
                    stepNumber={stepNumber}
                    selectType={selectType}
                    setSelectType={setSelectType}
                    setTriggerCreate={setTriggerCreate}
                    setActionCreate={setActionCreate}
                    actionCreate={actionCreate}
                    triggerCreate={triggerCreate}
                />
            )
        }
        </div>
    );
};

export default WorkflowStep;
