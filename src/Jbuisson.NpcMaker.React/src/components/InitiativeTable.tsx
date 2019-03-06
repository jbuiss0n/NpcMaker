import React, { useState } from 'react';
import InitiativeElement, { IInitiativeElement } from './InitiativeItem';
import AutoComplete, { IAutoCompleteItem } from './shared/AutoComplete';
import List from './shared/List';
import Trigger from '../models/Trigger';
import Mobile from '../models/Mobile';
import Random from '../utils/Random';
import CreatureFactory from '../services/CreatureFactory';

interface InitiativeTableProps {
  onFocusMobile: (mobile: Mobile) => void;
  onNewRoundStarted?: (round: number) => void;
}

class AutoCompleteMobile implements IAutoCompleteItem {

  public Id: number;
  public Name: string;

  public Mobile: Mobile;

  constructor(mobile: Mobile) {
    this.Id = mobile.Serial;
    this.Name = mobile.Name;
    this.Mobile = mobile;
  }
}

const InitiativeTable: React.FunctionComponent<InitiativeTableProps> = (props) => {
  const [round, setRound] = useState(0);
  const [newTriggerName, setNewTriggerName] = useState('');
  const [newTriggerRound, setNewTriggerRound] = useState(0);

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

  const addMobile = (autoCompleteResult: AutoCompleteMobile) => {
    const mobile = autoCompleteResult.Mobile;
    setElements([...elements, { Mobile: mobile, Initiative: Random.D20() + mobile.Initiative }]);
    props.onFocusMobile(mobile);
  }

  const sortByInitiative = (a: IInitiativeElement, b: IInitiativeElement): number => {
    if ((hasActionLeft(a.Mobile) && hasActionLeft(b.Mobile)) || (!hasActionLeft(a.Mobile) && !hasActionLeft(b.Mobile)))
      return b.Initiative - a.Initiative;

    if (!hasActionLeft(a.Mobile)) {
      return 1;
    }

    if (!hasActionLeft(b.Mobile)) {
      return -1;
    }

    return 0;
  }

  const onEndTurn = (mobile: Mobile) => {
    const index = elements.findIndex(el => el.Mobile.Serial === mobile.Serial);
    elements[index] = { ...elements[index], Mobile: mobile };

    if (elements.every(el => !hasActionLeft(el.Mobile))) {
      newRound();
    }
    else {
      setElements([...elements]);
    }
  }

  const onRemoveElement = (item: Mobile) => {
    const index = elements.findIndex(element => element.Mobile.Serial === item.Serial);
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

  const onCreatureSearch = async (term: string) => {
    return CreatureFactory.AutoComplete(term)
      .then(mobiles => mobiles.map(mobile => new AutoCompleteMobile(mobile)));
  }

  const renderItem = (item: Mobile | Trigger) => {
    return <div>{item.Name}</div>;
  }

  const renderActiveElement = (element: IInitiativeElement) => {
    return <InitiativeElement OnRemoveElement={onRemoveElement} OnEndTurn={onEndTurn} {...element} />;
  }

  const renderRemovedElement = (element: IInitiativeElement) => {
    return <InitiativeElement {...element} />;
  }

  return (
    <div className="initiative-table">
      <h2>Round: {round}</h2>

      <List<Trigger>
        className="initiative-table-triggers"
        Items={triggers.filter(trigger => trigger.Round >= round)}
        ItemComponent={renderItem} />

      <List<IInitiativeElement>
        className="initiative-table-items"
        Items={elements}
        ItemComponent={renderActiveElement}
        SortMethod={sortByInitiative} />

      <List<IInitiativeElement>
        className="initiative-table-items removed"
        Items={removedElements}
        ItemComponent={renderRemovedElement} />

      <div>
        <h3>Add creature</h3>
        <AutoComplete<AutoCompleteMobile>
          OnSelectItem={addMobile}
          OnSearch={onCreatureSearch}
          ItemComponent={renderItem} />
      </div>

      {/* <div>
        <h3>Add Creature</h3>
        <input type="text" value={creatureSearch} onChange={onCreatureSearchChange} />
        {!!creatureComplete && !!creatureComplete.length && (
          <ul>
            {creatureComplete.map(creature => <li key={creature.Name} onClick={() => addMobile(creature)}>{creature.Name}</li>)}
          </ul>
        )}
      </div> */}

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
