import { useState, useEffect } from "react";
import { Action, Trigger } from "../../services/Plums/plums";
import logo from '../../assets/logo58.png';
import dropDownSvg from '../../assets/create/dropDown.svg';
import dropDownUpSvg from '../../assets/create/dropDownUp.svg';
import checkSvg from '../../assets/create/check.svg';
import { TemplateCron, TemplateNumber, TemplateRadio, TemplateString, TemplateSearchDropdown } from "./templatesTypes";
import { getServices, getServicesWithTokens } from "../../services/Providers/providers";

interface ValueTemplate {
    [key: string]: {
        type: string;
        value: string | number | { [key: number]: { value: string } };
        result: number;
    };
}

interface WorkflowSetupProps {
    stepNumber: number;
    selectType?: Trigger[] | Action[];
    setSelectType?: React.Dispatch<React.SetStateAction<Trigger[] | Action[] | undefined>>;
    setTriggerCreate: React.Dispatch<React.SetStateAction<Trigger | null>>;
    setActionCreate: React.Dispatch<React.SetStateAction<Action | null>>;
    triggerCreate: Trigger | null;
    actionCreate: Action | null;
}

interface Service {
    name: string;
    authRoute: string;
    provider: string;
}

const WorkflowSetup: React.FC<WorkflowSetupProps> = ({ stepNumber, selectType, setSelectType, setTriggerCreate, setActionCreate, triggerCreate, actionCreate }) => {
    const [activeTab, setActiveTab] = useState<'setup' | 'configure' | 'start'>('setup');
    const [selectedTemplate, setSelectedTemplate] = useState<Trigger | Action | undefined>(undefined);
    const [templateValues, setTemplateValues] = useState<ValueTemplate | undefined>();
    const [hide, setHide] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<[string, boolean] | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [isErrorAuth, setIsErrorAuth] = useState<boolean>(false);

    const provider = selectType && selectType[0]?.provider;

    const [services, setServices] = useState<Service[]>([]);
    const [tokens, setTokens] = useState<any[]>([]);

    useEffect(() => {
        if (triggerCreate && stepNumber === 1) {
            setSelectedTemplate(triggerCreate);
        } else if (actionCreate && stepNumber !== 1) {
            setSelectedTemplate(actionCreate);
        } else if (selectType) {
            setSelectedTemplate(selectType[0]);
        }
    }, [selectType]);

    useEffect(() => {
        if (selectedTemplate?.valueTemplate) {
            setTemplateValues(selectedTemplate.valueTemplate as ValueTemplate);
            setError(null);
        }
    }, [selectedTemplate]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        const selected = selectType?.find(template => template.name === selectedName);
        setSelectedTemplate(selected);
    };

    const fetchServices = async () => {
        const servicesTokenData = await getServicesWithTokens();
        const servicesData = await getServices();
        setTokens(servicesTokenData);
        const tokenProviders = servicesTokenData.map((token : any) => token.provider);
        setServices(servicesData.filter((service : Service) => (!service.authRoute && !tokenProviders.includes(service.name)) ));
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const finalizeSetup = () => {
        if (error?.includes(true)) {
            setIsError(true);
            return;
        }
        if (tokens.find((token : any) => token.provider === provider) || services.find((service : Service) => service.provider === provider))
            setIsErrorAuth(false);
        else {
            setIsErrorAuth(true);
            return;
        }

        setIsError(false);
        setCompleted(true);
        setHide(true);
        if (stepNumber === 1) {
            setTriggerCreate(selectedTemplate as Trigger);
        } else {
            setActionCreate(selectedTemplate as Action);
        }
    };

    const handleTemplateValueChange = (key: string, newValue: any, type: string, isError: boolean) => {
        setError([key, isError]);
        if (templateValues && type === "value") {
            templateValues[key].value = newValue;
        } else if (templateValues && type === "result") {
            templateValues[key].result = newValue;
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'setup':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm dark:text-white font-semibold mb-1">App</label>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 dark:bg-customDarkBorder dark:text-white bg-gray-100 px-3 py-2 rounded-md">
                                    <img src={logo} alt="App Logo" className="w-5 h-5" />
                                    <span className="text-sm font-semibold">{provider}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm dark:text-white font-semibold mb-1">Type Event <span className="text-red-500">*</span></label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-customGreen dark:bg-customDarkGreen dark:text-white dark:border-gray-600"
                                onChange={handleSelectChange}
                                value={selectedTemplate?.name}
                            >
                                {selectType?.map((type) => (
                                    <option value={type.name} key={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            case 'configure':
                return (
                    <div>
                        {templateValues && (
                            <div className="space-y-4">
                                <h4 className="text-lg dark:text-white font-semibold">Configure Trigger</h4>
                                {Object.entries(templateValues).map(([key, config]) => (
                                    <div key={key} className="space-y-1">
                                        <label className="block text-sm dark:text-white font-semibold">{key}<span className="text-red-500">*</span></label>
                                        {config.type === 'CRON expression' && <TemplateCron value={config.value} onChange={(newValue) => handleTemplateValueChange(key, newValue, "value", false)}/>}
                                        {config.type === 'string' && <TemplateString value={config.value} onChange={(newValue) => handleTemplateValueChange(key, newValue, "value", false)}/>}
                                        {config.type === 'radiobutton' && <TemplateRadio value={config.value} result={config.result} onChange={(newValue) => handleTemplateValueChange(key, newValue, "result", false)}/>}
                                        {config.type === 'number' && <TemplateNumber value={config.value} onChange={(newValue) => handleTemplateValueChange(key, newValue, "value", false)}/>}
                                        {config.type === 'search dropdown' && (<TemplateSearchDropdown value={config.value} result={config.result} onChange={(newValue: any, isError : boolean) => handleTemplateValueChange(key, newValue, "result", isError)}/>)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'start':
                return (
                    <div>
                        {isError && <p className="text-red-500 text-sm">Please fill all required fields</p>}
                        {isErrorAuth && <p className="text-red-500 text-sm">Please Connect to {provider} in Services page</p>}
                        <button
                            className="w-full bg-customGreen text-customLightBlue px-4 py-2 rounded-md hover:bg-customDarkGreen transition-all"
                            onClick={() => finalizeSetup()}
                        >
                            Create
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-customDarkCard flex flex-col rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between py-3">
                <div className="flex justify-start gap-2">
                    {completed && (
                        <img
                            src={checkSvg}
                            alt="dropDownSvg"
                            className="w-8 h-8"
                        />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedTemplate?.name}</h3>
                </div>
                <button
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500"
                    onClick={() => setHide((prev) => !prev)}
                >
                    <img
                        src={hide ? dropDownSvg : dropDownUpSvg}
                        alt="dropDownSvg"
                        className="w-8 h-8"
                    />
                </button>
            </div>
            {!hide && (
                <div>
                    <div className="flex border-b">
                        {['setup', 'configure', 'start'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as 'setup' | 'configure' | 'start')}
                                className={`flex-1 py-2 text-center text-sm font-semibold ${
                                    activeTab === tab ? 'text-customGreen border-b-2 border-customGreen' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">{renderTabContent()}</div>
                    {activeTab !== 'start' && (
                        <div className="p-4 border-t">
                            <button
                                className="w-full bg-gray-200 text-customGreen dark:text-white dark:hover:bg-customDarkDarkGreen px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-customDarkGreen dark:hover:bg-customDarkCard"
                                onClick={() => {activeTab === 'setup' ? setActiveTab('configure') : setActiveTab('start')}}>
                                {activeTab === 'setup' ? 'Next: Configure' : 'Next: Start'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkflowSetup;
