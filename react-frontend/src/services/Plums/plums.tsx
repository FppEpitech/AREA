import axios from 'axios';

export interface Trigger {
    id: number;
    name: string;
    provider: string;
    type: string;
    valueTemplate: string;
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

export const createPlum = async (trigger : Trigger, action : Action) => {
    try {
        const body = {token: localStorage.getItem('access_token'), actionTemplateId: action.id, actionValue: action.valueTemplate, triggerTemplateId: trigger.id, triggerValue: trigger.valueTemplate};
        await axios.post(`${process.env.REACT_APP_API_URL}/plums`, body);
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
