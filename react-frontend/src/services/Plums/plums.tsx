import axios from 'axios';

interface ValueTemplate {
    [key: string]: {
        type: string;
        value: string;
    };
}

export interface Trigger {
    id: number;
    name: string;
    provider: string;
    type: string;
    valueTemplate: ValueTemplate;
}

export interface Action extends Trigger {}

export const getTriggers = async (): Promise<Trigger[]> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/triggers/templates`);
        return response.data
    } catch (error) {
        return [];
    }
};

export const getActions = async (): Promise<Action[]> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/actions/templates`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const createPlum = async (name : string, trigger : Trigger, action : Action) => {
    try {
        const token = localStorage.getItem("access_token");
        const body = {
            name: name,
            actionTemplateName: action.name,
            actionTemplateProvider: action.provider,
            actionValue: JSON.stringify(action.valueTemplate),
            triggerTemplateName: trigger.name,
            triggerTemplateProvider: trigger.provider,
            triggerValue: JSON.stringify(trigger.valueTemplate)
        };
        const headers = {
            Authorization: `Bearer ${token}`
        };
        await axios.post(`${process.env.REACT_APP_API_URL}/plums`, body, { headers: headers });
    } catch(error) {
        console.log(error);
    }
};

export const getProvidersTriggers = async (provider : string): Promise<Trigger[]> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/triggers/templates/${provider}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getProvidersActions = async (provider : string): Promise<Action[]> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/actions/templates/${provider}`);
        return response.data;
    } catch (error) {
        return [];
    }
};
