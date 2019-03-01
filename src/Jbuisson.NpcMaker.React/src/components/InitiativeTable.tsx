import React, { useState } from 'react';
import InitiativeElement, { IInitiativeElement } from './InitiativeItem';
import Trigger from '../models/Trigger';
import Mobile from '../models/Mobile';
import Random from '../utils/Random';
import MobileService from '../services/MobileService';

const InitiativeTable: React.FunctionComponent = () => {
  const [round, setRound] = useState(0);
  const [creatureSearch, setCreatureSearch] = useState('');
  const [newTriggerName, setNewTriggerName] = useState('');
  const [newTriggerRound, setNewTriggerRound] = useState(0);

  const [creatureComplete, setCreatureComplete] = useState<Array<Mobile>>([]);

  const [triggers, setTriggers] = useState<Array<Trigger>>([]);
  const [elements, setElements] = useState<Array<IInitiativeElement>>([]);
  const [removedElements, setRemovedElements] = useState<Array<IInitiativeElement>>([]);

  const resetMobile = (mobile: Mobile): Mobile => {
    mobile.ActionUsed = false;
    mobile.ReactionUsed = false;
    mobile.BonusActionUsed = false;

    return mobile;
  }

  const addTrigger = (event: React.FormEvent) => {
    setTriggers([...triggers, { Name: newTriggerName, Round: newTriggerRound }]);
    setNewTriggerName('');
    setNewTriggerRound(0);

    event.preventDefault();
  }

  const addMobile = (mobile: Mobile) => {
    setElements([...elements, { Mobile: mobile, Initiative: Random.D20() + mobile.Initiative }]);
    setCreatureComplete([]);
    setCreatureSearch('');
  }

  const orderInitiativeTable = () => {
    return elements.sort((a, b) => {
      if ((hasActionLeft(a.Mobile) && hasActionLeft(b.Mobile)) || (!hasActionLeft(a.Mobile) && !hasActionLeft(b.Mobile)))
        return b.Mobile.Initiative - a.Mobile.Initiative;

      if (!hasActionLeft(a.Mobile)) {
        return 1;
      }

      if (!hasActionLeft(b.Mobile)) {
        return -1;
      }

      return 0;
    });
  }

  const onEndTurn = (mobile: Mobile) => {
    const index = elements.findIndex(el => el.Mobile.Name === mobile.Name);
    elements[index] = { ...elements[index], Mobile: mobile };

    if (elements.every(el => !hasActionLeft(el.Mobile))) {
      newRound();
    }
    else {
      setElements([...elements]);
    }
  }

  const onRemoveElement = (item: Mobile) => {
    const index = elements.findIndex(element => element.Mobile.Name === item.Name);
    if (index < 0)
      return;

    setElements(elements.filter((element, i) => i !== index));
    setRemovedElements([...removedElements, elements[index]]);
  }

  const hasActionLeft = (item: Mobile) => {
    const mobile = item as Mobile;
    return item && (!mobile.ActionUsed || !mobile.BonusActionUsed);
  }

  const newRound = () => {
    const newRound = round + 1;

    const newRoundMobiles = elements
      .map(el => ({ Mobile: resetMobile(el.Mobile), Initiative: el.Initiative }));

    setRound(newRound);
    setElements(newRoundMobiles);
  }

  const onCreatureSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const creatures = await MobileService.AutoComplete(term);
    setCreatureComplete(creatures);
    setCreatureSearch(term);
  }

  return (
    <div className="initiative-table">
      <h2>Round: {round}</h2>

      <ul className="initiative-table-triggers">
        {triggers
          .filter(trigger => trigger.Round >= round)
          .map(trigger =>
            <li key={trigger.Name}>{trigger.Name}</li>)}
      </ul>

      <ul className="initiative-table-items">
        {orderInitiativeTable().map(element =>
          <li key={element.Mobile.Name}><InitiativeElement OnRemoveElement={onRemoveElement} OnEndTurn={onEndTurn} {...element} /></li>)}
      </ul>

      <ul className="initiative-table-items removed">
        {removedElements.map(element =>
          <li key={element.Mobile.Name}><InitiativeElement {...element} /></li>)}
      </ul>

      <div>
        <h3>Add Creature</h3>
        <input type="text" value={creatureSearch} onChange={onCreatureSearchChange} />
        {!!creatureComplete && !!creatureComplete.length && (
          <ul>
            {creatureComplete.map(creature => <li key={creature.Name} onClick={() => addMobile(creature)}>{creature.Name}</li>)}
          </ul>
        )}
      </div>

      {/* <div>
        <h3>Add Trigger</h3>
        <form onSubmit={addTrigger}>
          <input placeholder="Name" type="text" value={newTriggerName} onChange={(e) => setNewTriggerName(e.target.value)} />
          <input placeholder="Round" type="number" value={newTriggerRound} onChange={(e) => setNewTriggerRound(Number(e.target.value))} />
          <input type="submit" value="Add Trigger" />
        </form>
      </div> */}
    </div>
  );
}

export default InitiativeTable;
