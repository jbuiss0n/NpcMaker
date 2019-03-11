import React, { Fragment } from 'react';
import EncounterContext from '../contexts/EncounterContext';
import CharactersService from '../services/CharactersService';
import AutoComplete, { IAutoCompleteItem } from './shared/AutoComplete';
import Mobile from '../models/Mobile';
import Creature from '../models/Creature';

interface ICreatureFormProps {
  onAddCreatures: (...mobile: Mobile[]) => void;
}

interface ICreatureFormState {
  Number: number;
  Initiative: number;
}

export class CreatureForm extends React.Component<ICreatureFormProps, ICreatureFormState> {
  context!: React.ContextType<typeof EncounterContext>;

  constructor(props: ICreatureFormProps) {
    super(props);
    this.state = { Number: 1, Initiative: 0 };

    this.onSelectCreature = this.onSelectCreature.bind(this);
    this.onSearchCreature = this.onSearchCreature.bind(this);
    this.onCreatureNumberChange = this.onCreatureNumberChange.bind(this);
    this.onCreatureInitiativeChange = this.onCreatureInitiativeChange.bind(this);
  }

  async onSelectCreature(item: IAutoCompleteItem) {
    let mobiles: Mobile[] = [];

    for (let i = 0; i < this.state.Number; i++) {
      const character = await CharactersService.Find(item.Id);
      const mobile = new Creature(character);

      mobile.OnEnterEncounter(this.state.Initiative);
      mobiles.push(mobile);
    }

    this.props.onAddCreatures(...mobiles);
    this.setState({ Number: 1, Initiative: 0 });
  }

  onSearchCreature(term: string) {
    return CharactersService.AutoComplete(term);
  }

  onCreatureNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const number = Number(e.target.value);

    this.setState({ ...this.state, Number: number });
  }

  onCreatureInitiativeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const initiative = Number(e.target.value);

    this.setState({ ...this.state, Initiative: initiative });
  }

  render() {
    return (<Fragment>
      <h3>Add creatures</h3>
      <div>
        <label htmlFor="add-creatures-count">Number:</label>
        <input id="add-creatures-count" type="number" onChange={this.onCreatureNumberChange} value={this.state.Number} />
      </div>
      <div>
        <label htmlFor="add-creatures-initiative">Initiative:</label>
        <input id="add-creatures-initiative" type="number" onChange={this.onCreatureInitiativeChange} value={this.state.Initiative} />
      </div>
      <AutoComplete
        placeholder="Name..."
        OnSearch={this.onSearchCreature}
        OnSelectItem={this.onSelectCreature}
      />
    </Fragment>)
  }
}

CreatureForm.contextType = EncounterContext;

export default CreatureForm;
