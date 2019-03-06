import React from 'react';

interface IListProps<T> {
  className?: string;

  Items: T[];
  ItemComponent: any;

  SortMethod?: (a: T, b: T) => number;
}

export class List<T> extends React.Component<IListProps<T>> {
  render() {
    const {
      className,

      Items,
      ItemComponent,

      SortMethod
    } = this.props;

    return (
      <div className={className}>
        {Items.sort(SortMethod).map((item, index) => <div key={index}><ItemComponent {...item} /></div>)}
      </div>
    );
  }
}

export default List;
