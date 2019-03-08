import React from 'react';
import EncounterContext from '../contexts/EncounterContext';
import InitiativeElement, { IInitiativeElement } from './InitiativeItem';
import List from './shared/List';
import Random from '../utils/Random';

export class InitiativeTable extends React.Component {
  context!: React.ContextType<typeof EncounterContext>;

  render() {
    const activeMobiles = this.context.Mobiles
      .filter(mobile => mobile.CurrentHitPoints > 0)
      .map(mobile => ({ Mobile: mobile, Initiative: Random.D20() + mobile.Initiative }));

    const deadMobiles = this.context.Mobiles
      .filter(mobile => mobile.CurrentHitPoints <= 0)
      .map(mobile => ({ Mobile: mobile, Initiative: 0 }));

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

    const renderInitiativeElement = (element: IInitiativeElement) => {
      return <InitiativeElement {...element} />;
    }

    return (
      <div className="initiative-table">
        <List<IInitiativeElement>
          className="initiative-table-items"
          Items={activeMobiles}
          ItemComponent={renderInitiativeElement}
          SortMethod={initiativeSort} />

        <List<IInitiativeElement>
          className="initiative-table-items removed"
          Items={deadMobiles}
          ItemComponent={renderInitiativeElement} />
      </div>
    );
  }
}

InitiativeTable.contextType = EncounterContext;

export default InitiativeTable;
