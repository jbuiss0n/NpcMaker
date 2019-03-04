import React, { useState } from 'react';
import Mobile from '../models/Mobile';
import InitiativeTable from './InitiativeTable';
import { EncounterContextProvider } from '../contexts/EncounterContext';

const Board: React.FunctionComponent = () => {

  const [focusMobile, setFocusMobile] = useState<Mobile | null>(null);

  return (
    <EncounterContextProvider value={focusMobile}>
      <div className="board">
        <InitiativeTable onFocusMobile={setFocusMobile} />
        <div className="focus">
          {focusMobile && focusMobile.Name}
        </div>
      </div>
    </EncounterContextProvider>
  );
}

export default Board;
