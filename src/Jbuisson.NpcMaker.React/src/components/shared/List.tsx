import React from 'react';

export interface IListItem<T> {
  Item: T;
}

interface IListProps<T> {
  className?: string;

  Items: IListItem<T>[];
  ItemComponent: React.ComponentType<T>;

  SortMethod?: (a: T, b: T) => number;
}

export class List<T> extends React.Component<IListProps<T>> {
  render() {
    const {
      className,
      Items,
      ItemComponent,
      SortMethod = () => 0,
    } = this.props;

    return (
      <div className={className}>
        {Items
          .sort((a, b) => SortMethod(a.Item, b.Item))
          .map((item, index) => <ItemComponent key={index} {...item.Item} />)}
      </div>
    );
  }
}

export default List;
