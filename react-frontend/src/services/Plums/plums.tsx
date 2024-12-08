// import React from 'react';
// import axios from 'axios';

export interface Trigger {
    name: string;
    json: string;
    id: number;
}

export interface Action extends Trigger {}

export const getTriggers = async (): Promise<Trigger[]> => {
    return [{ id: 1, name: "Default", json: "default Json" }, { id: 2, name: "Default", json: "Default Json" }]; // TODO: axios get method for triggers
};


export const getActions = async (): Promise<Action[]> => {
    return [{ id: 3, name: "Default", json: "Default Json" }, { id: 4, name: "Default", json: "Default Json" }]; // TODO: axios get method for actions
};

export const createPlum = async (trigger : Trigger, action : Action) => {
    console.log(trigger.json)
    console.log(action.json)
};
