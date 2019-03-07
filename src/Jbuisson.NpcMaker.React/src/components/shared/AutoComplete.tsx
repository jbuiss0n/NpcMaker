import React from 'react';
import List from './List';

export interface IAutoCompleteItem {
  Id: number;
  Name: string;
}

interface IAutoCompleteProps<T extends IAutoCompleteItem> extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  ItemComponent?: any;

  OnSearch: (term: string) => Promise<T[]>;
  OnSelectItem: (item: T) => void;
}

interface IAutoCompleteState<T> {
  Term: string;
  Items: T[];
}

export class AutoComplete<T extends IAutoCompleteItem> extends React.Component<IAutoCompleteProps<T>, IAutoCompleteState<T>> {


  render() {
    const {
      className,

      ItemComponent,

      OnSearch,
      OnSelectItem,
    } = this.props;

    const {
      Term,
      Items,
    } = this.state || { Term: '', Items: [] };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      const items = await OnSearch(term);

      this.setState({ Items: items, Term: term });
    };

    const onItemClick = (item: T) => {
      OnSelectItem(item);
      this.setState({ Items: [], Term: '' });
    }

    const renderItem = (item: T) => {
      return <div onClick={() => onItemClick(item)}>{item.Name}</div>;
    }

    return (
      <div className={className}>
        <input type="text" value={Term} onChange={onChange} />
        <List<T> Items={Items} ItemComponent={ItemComponent || renderItem} />
      </div>
    );
  }
}

export default AutoComplete;
