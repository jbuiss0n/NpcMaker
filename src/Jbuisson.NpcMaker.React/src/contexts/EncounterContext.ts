import React from 'react';
import Mobile from '../models/Mobile';

const context = React.createContext<Mobile | null>(null);

export const EncounterContextProvider = context.Provider;
export const EncounterContextConsumer = context.Consumer;
