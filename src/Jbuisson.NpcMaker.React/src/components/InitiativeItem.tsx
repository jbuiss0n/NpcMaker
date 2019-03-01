import React from 'react';
import Mobile from '../models/Mobile';

export interface IInitiativeElement {
  Mobile: Mobile;
  Initiative: number;

  OnEndTurn?: (item: Mobile) => void;
  OnRemoveElement?: (item: Mobile) => void;
}

const InitiativeElement: React.FunctionComponent<IInitiativeElement> = (props) => {
  const { Mobile, Initiative } = props;

  const endTurn = (e: React.MouseEvent) => {
    if (e.ctrlKey && e.altKey)
      return props.OnRemoveElement && props.OnRemoveElement(Mobile);

    if (e.ctrlKey)
      Mobile.ActionUsed = true;

    if (e.shiftKey)
      Mobile.BonusActionUsed = true;

    if (e.altKey)
      Mobile.ReactionUsed = true;

    props.OnEndTurn && props.OnEndTurn(Mobile);
  }

  return (
    <div className="initiative-item" onClick={endTurn}>
      {Initiative} ({Mobile.Initiative}) : {Mobile.Name}
      ({!Mobile.ActionUsed ? 'A' : ''}{!Mobile.ReactionUsed ? 'R' : ''}{!Mobile.BonusActionUsed ? 'B' : ''})
    </div>
  );
}

export default InitiativeElement;
