// import React from 'react';
import axios from 'axios';

export interface Trigger {
    name: string;
    id: number;
    json: string;
}

export interface Action extends Trigger {}

export const getTriggers = async (): Promise<Trigger[]> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/triggers/templates`);
        return response.data.map((item: any) => ({
            name: item.name,
            id: item.id,
            json: JSON.stringify(item.valueTemplate || null),
        }));
    } catch (error) {
        return [];
    }
};

export const getActions = async (): Promise<Action[]> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/actions/templates`);
        return response.data.map((item: any) => ({
            name: item.name,
            id: item.id,
            json: JSON.stringify(item.valueTemplate || null),
        }));
    } catch (error) {
        return [];
    }
};

export const createPlum = async (trigger : Trigger, action : Action) => {
    try {
        const body = {actionTemplateId: action.id, actionValue: action.json, trigerTemplateId: trigger.id, triggerValue: trigger.json};
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/plums`, body);
    } catch(error) {
        console.log(error);
    }
};
