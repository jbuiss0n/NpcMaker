import React, { FunctionComponent, useState, MouseEvent } from 'react';
import IMobile from '../models/IMobile';
import ITrigger from '../models/ITrigger';

export interface IInitiativeElement {
  Item: IMobile | ITrigger;
  Initiative: number;

  OnEndTurn?: (item: IMobile | ITrigger) => void;
  OnRemoveElement?: (item: IMobile | ITrigger) => void;
}

const InitiativeElement: FunctionComponent<IInitiativeElement> = (props) => {
  const { Item, Initiative } = props;
  const Mobile = Item as IMobile;
  const Trigger = Item as ITrigger;

  const endTurn = (e: MouseEvent) => {
    if (!props.OnEndTurn || !Mobile)
      return;

    if (e.ctrlKey && e.altKey)
      return props.OnRemoveElement && props.OnRemoveElement(Item);

    if (e.ctrlKey)
      Mobile.ActionUsed = true;

    if (e.shiftKey)
      Mobile.BonusActionUsed = true;

    if (e.altKey)
      Mobile.ReactionUsed = true;

    props.OnEndTurn(Mobile);
  }

  return (
    <div className="initiative-item" onClick={endTurn}>
      {Initiative} : {Item.Name}
      (
        {Trigger && Trigger.Round}
        {Mobile && !Mobile.ActionUsed ? 'A' : ''}
        {Mobile && !Mobile.BonusActionUsed ? 'B' : ''}
        {Mobile && !Mobile.ReactionUsed ? 'R' : ''}
      )
    </div>
  );
}

export default InitiativeElement;
