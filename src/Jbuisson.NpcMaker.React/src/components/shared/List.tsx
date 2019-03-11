import React, { Fragment } from 'react';

export interface IListItem<T> {
  Item: T;
}

interface IListProps<T> {
  className?: string;

  Items: IListItem<T>[];

  RenderItem: (item: T) => React.ReactNode;
  SortMethod?: (a: T, b: T) => number;
}

export class List<T> extends React.Component<IListProps<T>> {
  render() {
    const {
      className,
      Items,
      RenderItem,
      SortMethod = () => 0,
    } = this.props;

    return (
      <div className={className}>
        {Items
          .sort((a, b) => SortMethod(a.Item, b.Item))
          .map((item, index) => <Fragment key={index}>{RenderItem(item.Item)}</Fragment>)}
      </div>
    );
  }
}

export default List;
