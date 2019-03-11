import React from 'react';
import EncounterContext from '../contexts/EncounterContext';
import List from './shared/List';
import Mobile from '../models/Mobile';

export class InitiativeTable extends React.Component {
  context!: React.ContextType<typeof EncounterContext>;

  constructor(props = {}) {
    super(props);
    
    this.initiativeSort = this.initiativeSort.bind(this);
    this.renderInitiativeElement = this.renderInitiativeElement.bind(this);
  }

  initiativeSort(a: Mobile, b: Mobile): number {
    if ((a.ActionLeft && b.ActionLeft) || (!a.ActionLeft && !b.ActionLeft))
      return b.Initiative - a.Initiative;

    if (!a.ActionLeft) {
      return 1;
    }

    if (!b.ActionLeft) {
      return -1;
    }

    return 0;
  }

  renderInitiativeElement(mobile: Mobile) {
    return (
      <div className="initiative-item" onClick={() => this.context.OnMobileSelect(mobile)}>
        {mobile.Initiative} ({mobile.Dexterity.Modifier}) : {mobile.Name} - {mobile.Serial}
        ({!mobile.ActionUsed ? 'A' : ''}{!mobile.ReactionUsed ? 'R' : ''}{!mobile.BonusActionUsed ? 'B' : ''})
      </div>);
  }

  render() {
    const activeMobiles = this.context.Mobiles
      .filter(mobile => mobile.CurrentHitPoints > 0)
      .map(mobile => ({ Item: mobile }));

    const deadMobiles = this.context.Mobiles
      .filter(mobile => mobile.CurrentHitPoints <= 0)
      .map(mobile => ({ Item: mobile }));

    return (
      <div className="initiative-table">
        {/* <List<Mobile>
          className="initiative-table-items"
          Items={activeMobiles}
          ItemComponent={this.renderInitiativeElement}
          SortMethod={this.initiativeSort} />

        <List<Mobile>
          className="initiative-table-items removed"
          Items={deadMobiles}
          ItemComponent={this.renderInitiativeElement} /> */}
      </div>
    );
  }
}

InitiativeTable.contextType = EncounterContext;

export default InitiativeTable;
