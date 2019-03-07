import React, { useState } from 'react';
import InitiativeElement, { IInitiativeElement } from './InitiativeItem';
import AutoComplete, { IAutoCompleteItem } from './shared/AutoComplete';
import CharactersServices from '../services/CharactersService';
import List from './shared/List';
import Mobile from '../models/Mobile';
import Random from '../utils/Random';
import Creature from '../models/Creature';

interface InitiativeTableProps {
  onFocusMobile: (mobile: Mobile) => void;
  onNewRoundStarted?: (round: number) => void;
}

const InitiativeTable: React.FunctionComponent<InitiativeTableProps> = (props) => {
  const [round, setRound] = useState(0);
  const [elements, setElements] = useState<Array<IInitiativeElement>>([]);
  const [removedElements, setRemovedElements] = useState<Array<IInitiativeElement>>([]);

  const onAddCreature = async (item: IAutoCompleteItem) => {
    const character = await CharactersServices.Find(item.Id);

    if (!character) return;

    const mobile = new Creature(character);
    setElements([...elements, { Mobile: mobile, Initiative: Random.D20() + mobile.Initiative }]);
    props.onFocusMobile(mobile);
  }

  const onCreatureEndTurn = () => {
    if (elements.every(el => el.Mobile.TurnEnded)) {
      newRound();
    }

    setElements([...elements]);
  }

  const onCreatureRemoved = (element: IInitiativeElement) => {
    setElements(elements.filter(el => el.Mobile.Serial !== element.Mobile.Serial));
    setRemovedElements([...removedElements, element]);
  }

  const initiativeSort = (a: IInitiativeElement, b: IInitiativeElement): number => {
    if ((a.Mobile.ActionLeft && b.Mobile.ActionLeft) || (!a.Mobile.ActionLeft && !b.Mobile.ActionLeft))
      return b.Initiative - a.Initiative;

    if (!a.Mobile.ActionLeft) {
      return 1;
    }

    if (!b.Mobile.ActionLeft) {
      return -1;
    }

    return 0;
  }

  const newRound = () => {
    const newRound = round + 1;

    elements.forEach(el => el.Mobile.OnNewRound(newRound));

    setRound(newRound);
  }

  const renderActiveElement = (element: IInitiativeElement) => {
    return <InitiativeElement OnRemoveElement={onCreatureRemoved} OnEndTurn={onCreatureEndTurn} {...element} />;
  }

  const renderRemovedElement = (element: IInitiativeElement) => {
    return <InitiativeElement {...element} />;
  }

  return (
    <div className="initiative-table">
      <h2>Round: {round}</h2>

      <div>
        <h3>Add creature</h3>
        <AutoComplete
          OnSelectItem={onAddCreature}
          OnSearch={CharactersServices.AutoComplete} />
      </div>

      <List<IInitiativeElement>
        className="initiative-table-items"
        Items={elements}
        ItemComponent={renderActiveElement}
        SortMethod={initiativeSort} />

      <List<IInitiativeElement>
        className="initiative-table-items removed"
        Items={removedElements}
        ItemComponent={renderRemovedElement} />
    </div>
  );
}

export default InitiativeTable;
