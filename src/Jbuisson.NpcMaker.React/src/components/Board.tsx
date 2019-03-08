import React, { useState } from 'react';
import { IEncounterContext, EncounterContextProvider, DefaultContext } from '../contexts/EncounterContext';
import Mobile from '../models/Mobile';
import InitiativeTable from './InitiativeTable';

const Board: React.FunctionComponent = () => {

  const [context, setContext] = useState<IEncounterContext>(DefaultContext);
  const [selectedMobile, setSelectedMobile] = useState<Mobile | undefined>(undefined);

  context.OnMobileSelect = (mobile) => {
    setSelectedMobile(mobile);
  }

  return (
    <EncounterContextProvider value={context}>
      <div className="board">
        <aside>
          <InitiativeTable />
        </aside>
        <section className="screen">
          <h2>Round: {context.Round}</h2>
          <section className="selected-mobile">{selectedMobile && selectedMobile.Name}</section>
        </section>
      </div>
    </EncounterContextProvider>
  );
}

export default Board;
