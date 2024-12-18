import { useState, useEffect } from "react";
import { Action, Trigger } from "../../services/Plums/plums";
import logo from '../../assets/logo58.png';

interface WorkflowSetupProps {
    stepNumber: number;
    selectType?: Trigger[] | Action[];
    setSelectType?: React.Dispatch<React.SetStateAction<Trigger[] | Action[] | undefined>>;
}

const WorkflowSetup: React.FC<WorkflowSetupProps> = ({ stepNumber, selectType, setSelectType }) => {
    const [activeTab, setActiveTab] = useState<'setup' | 'configure' | 'start'>('setup');
    const [selectedTemplate, setSelectedTemplate] = useState<Trigger | Action | undefined>(undefined);

    const provider = selectType && selectType[0]?.provider;

    useEffect(() => {
        if (selectType) {
            setSelectedTemplate(selectType[0]);
        }
    }, [selectType]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        const selected = selectType?.find(template => template.name === selectedName);
        setSelectedTemplate(selected);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'setup':
                return (
                    <div className="space-y-6">
                        {/* App Selection */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">App</label>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-md">
                                    <img
                                        src={logo}
                                        alt="Gmail"
                                        className="w-5 h-5"
                                    />
                                    <span className="text-sm font-semibold">{provider}</span>
                                </div>
                            </div>
                        </div>

                        {/* Trigger Event */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Type Event <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                onChange={handleSelectChange}
                            >
                                {selectType?.map((type) => (
                                    <option value={type.name} key={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Account Selection */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Account <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder={`Connect ${provider}`}
                                    disabled
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-500"
                                />
                                <button className="bg-customGreen text-white px-3 py-2 rounded-md hover:bg-customDarkGreen">
                                    Sign
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'configure':
                return (
                    <div>
                        Configuration Panel
                    </div>);
            case 'start':
                return <div>
                    <button
                        className="w-full bg-customGreen text-customLightBlue px-4 py-2 rounded-md hover:bg-customDarkGreen"
                    >
                        Create
                    </button>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div className="absolute mt-36 top-0 right-0 w-96 bg-white border-l border-gray-200 shadow-custom flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="text-lg font-semibold">{stepNumber}. {selectedTemplate?.name}</h3>
                <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={setSelectType ? () => setSelectType(undefined) : undefined}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
                {['setup', 'configure', 'start'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as 'setup' | 'configure' | 'start')}
                        className={`flex-1 py-2 text-center text-sm font-semibold ${
                            activeTab === tab
                                ? 'text-customGreen border-b-2 border-customGreen'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {renderTabContent()}
            </div>

            {/* Footer */}
            {activeTab !== 'start' && (
                <div className="p-4 border-t">
                    <button className="w-full bg-gray-200 text-customGreen px-4 py-2 rounded-md hover:bg-gray-300">
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
};

export default WorkflowSetup;
