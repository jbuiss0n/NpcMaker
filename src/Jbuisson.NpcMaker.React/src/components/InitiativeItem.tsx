import React from 'react';
import Mobile from '../models/Mobile';

export interface IInitiativeElement {
  Mobile: Mobile;
  Initiative: number;

  OnEndTurn?: (item: IInitiativeElement) => void;
  OnRemoveElement?: (item: IInitiativeElement) => void;
}

const InitiativeElement: React.FunctionComponent<IInitiativeElement> = (props) => {
  const { Mobile, Initiative } = props;

  const endTurn = (e: React.MouseEvent) => {
    if (e.ctrlKey && e.altKey)
      return props.OnRemoveElement && props.OnRemoveElement(props);

    if (e.ctrlKey)
      return Mobile.UseAction();

    if (e.shiftKey)
      return Mobile.UseBonusAction();

    if (e.altKey)
      return Mobile.UseReaction();

    Mobile.EndTurn();
    props.OnEndTurn && props.OnEndTurn(props);
  }

  return (
    <div className="initiative-item" onClick={endTurn}>
      {Initiative} ({Mobile.Initiative}) : {Mobile.Name} - {Mobile.Serial}
      ({!Mobile.ActionUsed ? 'A' : ''}{!Mobile.ReactionUsed ? 'R' : ''}{!Mobile.BonusActionUsed ? 'B' : ''})
    </div>
  );
}

export default InitiativeElement;
