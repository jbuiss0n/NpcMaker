import React from 'react';
import Mobile from '../models/Mobile';
import { EncounterContext } from '../contexts/EncounterContext';

export interface IInitiativeElement {
  Mobile: Mobile;
  Initiative: number;
}

export class InitiativeElement extends React.Component<IInitiativeElement> {
  context!: React.ContextType<typeof EncounterContext>

  render() {
    const { Mobile, Initiative } = this.props;

    return (
      <div className="initiative-item" onClick={() => this.context.OnMobileSelect(Mobile)}>
        {Initiative} ({Mobile.Initiative}) : {Mobile.Name} - {Mobile.Serial}
        ({!Mobile.ActionUsed ? 'A' : ''}{!Mobile.ReactionUsed ? 'R' : ''}{!Mobile.BonusActionUsed ? 'B' : ''})
    </div>
    );
  }
}

export default InitiativeElement;
