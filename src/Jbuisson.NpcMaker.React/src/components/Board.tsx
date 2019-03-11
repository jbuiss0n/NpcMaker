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

  const [creatureForm, setCreatureForm] = useState({ Number: 1, Initiative: 0 });

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
    let mobiles: Mobile[] = [];

    for (let i = 0; i < creatureForm.Number; i++) {
      const character = await CharactersService.Find(item.Id);
      const mobile = new Creature(character);

      mobile.OnEnterEncounter(creatureForm.Initiative);
      mobiles.push(mobile);
    }

    setContext({
      ...context,
      Mobiles: [...context.Mobiles, ...mobiles]
    });
    setCreatureForm({ Number: 1, Initiative: 0 });
  }

  const onCreatureNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);

    setCreatureForm({ ...creatureForm, Number: number });
  }

  const onCreatureInitiativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initiative = Number(e.target.value);

    setCreatureForm({ ...creatureForm, Initiative: initiative });
  }

  return (
    <EncounterContextProvider value={context}>
      <div className="board">
        <header className="head">Round: {context.Round}</header>

        <aside className="control">
          <h3>Add creatures</h3>
          <div>
            <label htmlFor="add-creatures-count">Number:</label>
            <input id="add-creatures-count" type="number" onChange={onCreatureNumberChange} value={creatureForm.Number} />
          </div>
          <div>
            <label htmlFor="add-creatures-initiative">Initiative:</label>
            <input id="add-creatures-initiative" type="number" onChange={onCreatureInitiativeChange} value={creatureForm.Initiative} />
          </div>
          <AutoComplete
            placeholder="Name..."
            OnSearch={onSearchCreature}
            OnSelectItem={onSelectCreature}
          />
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
