import React from 'react';
import List from './List';

export interface IAutoCompleteItem {
  Id: number;
  Name: string;
}

interface IAutoCompleteProps {
  placeholder?: string;

  OnSearch: (term: string) => Promise<IAutoCompleteItem[]>;
  OnSelectItem: (item: IAutoCompleteItem) => void;
}

interface IAutoCompleteState {
  Term: string;
  Items: IAutoCompleteItem[];
}

class AutoCompleteItem extends React.Component<IAutoCompleteItem> {

  
  render() {
    return (<div className="auto-complete-item">{this.props.Name}</div>);
  }
}

export class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {

  constructor(props: IAutoCompleteProps) {
    super(props);

    this.state = { Term: '', Items: [] };

    this.onChange = this.onChange.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  async onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    const items = await this.props.OnSearch(term);

    this.setState({ Items: items, Term: term });
  }

  onItemClick(item: IAutoCompleteItem) {
    this.props.OnSelectItem(item);
    this.setState({ Items: [], Term: '' });
  }

  render() {
    const {
      placeholder,
    } = this.props;

    const {
      Term,
      Items,
    } = this.state;

    return (
      <div className="auto_complete">
        <input type="text" value={Term} onChange={this.onChange} placeholder={placeholder} />
        <List<IAutoCompleteItem> Items={Items.map(item => ({ Item: item }))} ItemComponent={AutoCompleteItem} />
      </div>
    );
  }
}

export default AutoComplete;
