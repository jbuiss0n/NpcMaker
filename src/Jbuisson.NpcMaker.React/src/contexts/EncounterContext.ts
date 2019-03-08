import React from 'react';
import Mobile from '../models/Mobile';
import Creature from '../models/Creature';
import CharactersService from '../services/CharactersService';

export interface IEncounterContext {
  Round: number;
  Mobiles: Mobile[];

  OnMobileSelect: (mobile: Mobile) => void;
}

export const DefaultContext: IEncounterContext = {
  Round: 0,
  Mobiles: [],
  OnMobileSelect: () => { },
}

export const EncounterContext = React.createContext<IEncounterContext>(DefaultContext);
export const EncounterContextProvider = EncounterContext.Provider;
export const EncounterContextConsumer = EncounterContext.Consumer;

export default EncounterContext;
