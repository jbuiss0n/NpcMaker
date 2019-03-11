import React, { useState } from 'react';
import { IEncounterContext, EncounterContextProvider, DefaultContext } from '../contexts/EncounterContext';
import Mobile from '../models/Mobile';
import CreatureForm from './CreatureForm';
import InitiativeTable from './InitiativeTable';
import MobileCard from './views/MobileCard';

const Board: React.FunctionComponent = () => {

  const [context, setContext] = useState<IEncounterContext>(DefaultContext);
  const [selectedMobile, setSelectedMobile] = useState<Mobile | undefined>(undefined);

  context.OnMobileSelect = (mobile) => {
    setSelectedMobile(mobile);
  }

  const onDeselectCreature = () => {
    setSelectedMobile(undefined);
  }

  const onAddCreatures = (...mobiles: Mobile[]) => {
    setContext({
      ...context,
      Mobiles: [...context.Mobiles, ...mobiles]
    });
  }

  return (
    <EncounterContextProvider value={context}>
      <div className="board">
        <header className="head">Round: {context.Round}</header>

        <aside className="control">
          <CreatureForm onAddCreatures={onAddCreatures} />
          <hr />
        </aside>

        <aside className="initiative">
          <InitiativeTable />
        </aside>

        <section className="screen">
          SCREEN
        </section>

        {selectedMobile &&
          <section className="selected-mobile">
            <MobileCard onClose={onDeselectCreature} Mobile={selectedMobile} />
          </section>}
      </div>
    </EncounterContextProvider>
  );
}

export default Board;
