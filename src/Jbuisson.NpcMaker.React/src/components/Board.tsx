import React, { useState } from 'react';
import { IEncounterContext, EncounterContextProvider, DefaultContext } from '../contexts/EncounterContext';
import Mobile from '../models/Mobile';
import InitiativeTable from './InitiativeTable';
import AutoComplete, { IAutoCompleteItem } from './shared/AutoComplete';
import CharactersService from '../services/CharactersService';
import Creature from '../models/Creature';
import MobileCard from './views/MobileCard';

const Board: React.FunctionComponent = () => {

  const [context, setContext] = useState<IEncounterContext>(DefaultContext);
  const [selectedMobile, setSelectedMobile] = useState<Mobile | undefined>(undefined);

  context.OnMobileSelect = (mobile) => {
    setSelectedMobile(mobile);
  }

  const onSearchCreature = (term: string) => {
    return CharactersService.AutoComplete(term);
  }

  const onDeselectCreature = () => {
    setSelectedMobile(undefined);
  }

  const onSelectCreature = async (item: IAutoCompleteItem) => {
    const character = await CharactersService.Find(item.Id);
    const mobile = new Creature(character);

    mobile.OnEnterEncounter();

    setContext({
      ...context,
      Mobiles: [...context.Mobiles, mobile]
    });
  }

  return (
    <EncounterContextProvider value={context}>
      <div className="board">
        <header className="head">Round: {context.Round}</header>

        <aside className="control">
          <AutoComplete
            placeholder="Name..."
            OnSearch={onSearchCreature}
            OnSelectItem={onSelectCreature}
          />
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
