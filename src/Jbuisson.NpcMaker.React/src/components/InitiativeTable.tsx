import React, { FunctionComponent, useState, FormEvent } from 'react';
import InitiativeElement, { IInitiativeElement } from './InitiativeItem';
import Trigger from '../models/Trigger';
import Mobile from '../models/Mobile';
import Random from '../utils/Random';

const InitiativeTable: FunctionComponent = () => {
  const [newElementName, setNewElementName] = useState('');
  const [newTriggerName, setNewTriggerName] = useState('');
  const [newTriggerRound, setNewTriggerRound] = useState(0);

  const [round, setRound] = useState(0);
  const [triggers, setTriggers] = useState<Array<Trigger>>([]);
  const [elements, setElements] = useState<Array<IInitiativeElement>>([]);
  const [removedElements, setRemovedElements] = useState<Array<IInitiativeElement>>([]);

  const resetMobile = (newElementName: string): Mobile => {
    return { Name: newElementName, ActionUsed: false, BonusActionUsed: false, ReactionUsed: false };
  }

  const addTrigger = (event: FormEvent) => {
    setTriggers([...triggers, { Name: newTriggerName, Round: newTriggerRound }]);
    setNewTriggerName('');
    setNewTriggerRound(0);

    event.preventDefault();
  }

  const addElement = (event: FormEvent) => {
    const initiative = Random.D20();
    const mobile: Mobile = resetMobile(newElementName);

    setElements([...elements, { Item: mobile, Initiative: initiative }]);
    setNewElementName('');

    event.preventDefault();
  }

  const orderInitiativeTable = () => {
    return elements.sort((a, b) => {
      if ((hasActionLeft(a.Item) && hasActionLeft(b.Item)) || (!hasActionLeft(a.Item) && !hasActionLeft(b.Item)))
        return b.Initiative - a.Initiative;

      if (!hasActionLeft(a.Item)) {
        return 1;
      }

      if (!hasActionLeft(b.Item)) {
        return -1;
      }

      return 0;
    });
  }

  const onEndTurn = (item: Mobile | Trigger) => {
    const index = elements.findIndex(el => el.Item.Name === item.Name);
    elements[index] = { ...elements[index], Item: { ...item } };

    if (elements.every(el => !hasActionLeft(el.Item))) {
      newRound();
    }
    else {
      setElements([...elements]);
    }
  }

  const onRemoveElement = (item: Mobile | Trigger) => {
    const index = elements.findIndex(element => element.Item.Name === item.Name);
    if (index < 0)
      return;

    setElements(elements.filter((element, i) => i !== index));
    setRemovedElements([...removedElements, elements[index]]);
  }

  const hasActionLeft = (item: Mobile | Trigger) => {
    const mobile = item as Mobile;
    return item && (!mobile.ActionUsed || !mobile.BonusActionUsed);
  }

  const newRound = () => {
    const newRound = round + 1;

    const newRoundTriggers = triggers
      .filter(trigger => trigger.Round <= newRound)
      .map(trigger => ({ Item: trigger, Initiative: 25 }));

    const newRoundMobiles = elements
      .map(el => ({ Item: resetMobile(el.Item.Name), Initiative: el.Initiative }));

    setRound(newRound);
    setElements([...newRoundMobiles, ...newRoundTriggers]);
    setTriggers(triggers.filter(trigger => trigger.Round > newRound));
  }

  return (
    <div className="initiative-table">
      <h2>Round: {round}</h2>

      <ul className="initiative-table-items">
        {orderInitiativeTable().map(element =>
          <li key={element.Item.Name}><InitiativeElement OnRemoveElement={onRemoveElement} OnEndTurn={onEndTurn} {...element} /></li>)}
      </ul>

      <ul className="initiative-table-items removed">
        {removedElements.map(element =>
          <li key={element.Item.Name}><InitiativeElement {...element} /></li>)}
      </ul>

      <div>
        <h3>Add Creature</h3>
        <form onSubmit={addElement}>
          <input type="text" value={newElementName} onChange={(e) => setNewElementName(e.target.value)} />
          <input type="submit" value="Add Element" />
        </form>
      </div>

      <div>
        <h3>Add Trigger</h3>
        <form onSubmit={addTrigger}>
          <input placeholder="Name" type="text" value={newTriggerName} onChange={(e) => setNewTriggerName(e.target.value)} />
          <input placeholder="Round" type="number" value={newTriggerRound} onChange={(e) => setNewTriggerRound(Number(e.target.value))} />
          <input type="submit" value="Add Trigger" />
        </form>
      </div>
    </div>
  );
}

export default InitiativeTable;
