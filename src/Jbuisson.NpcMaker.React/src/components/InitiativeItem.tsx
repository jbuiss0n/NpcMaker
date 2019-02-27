import React, { FunctionComponent, useState, MouseEvent } from 'react';
import Mobile from '../models/Mobile';
import Trigger from '../models/Trigger';

export interface IInitiativeElement {
  Item: Mobile | Trigger;
  Initiative: number;

  OnEndTurn?: (item: Mobile | Trigger) => void;
  OnRemoveElement?: (item: Mobile | Trigger) => void;
}

const InitiativeElement: FunctionComponent<IInitiativeElement> = (props) => {
  const { Item, Initiative } = props;

  const endTurn = (e: MouseEvent) => {
    if (!props.OnEndTurn || !(Item instanceof Mobile))
      return;

    if (e.ctrlKey && e.altKey)
      return props.OnRemoveElement && props.OnRemoveElement(Item);

    if (e.ctrlKey)
      Item.ActionUsed = true;

    if (e.shiftKey)
      Item.BonusActionUsed = true;

    if (e.altKey)
      Item.ReactionUsed = true;

    props.OnEndTurn(Item);
  }

  return (
    <div className="initiative-item" onClick={endTurn}>
      {Initiative} : {Item.Name}
      (
        {Item instanceof Trigger && Item.Round}
        {Item instanceof Mobile && !Item.ActionUsed ? 'A' : ''}
        {Item instanceof Mobile && !Item.ReactionUsed ? 'R' : ''}
        {Item instanceof Mobile && !Item.BonusActionUsed ? 'B' : ''}
      )
    </div>
  );
}

export default InitiativeElement;
