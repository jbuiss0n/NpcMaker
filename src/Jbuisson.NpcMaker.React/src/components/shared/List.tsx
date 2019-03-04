import React from 'react';

interface IListProps<T> {
  Items: T[];
  ItemComponent: any;

  SortMethod?: (a: T, b: T) => number;
}

export class List<T> extends React.Component<IListProps<T> & React.HTMLAttributes<HTMLDivElement>> {
  render() {
    const {
      Items,
      ItemComponent,

      SortMethod
    } = this.props;

    return (
      <div {...this.props}>
        {Items.sort(SortMethod).map((item, index) => <div key={index}><ItemComponent {...item} /></div>)}
      </div>
    );
  }
}

export default List;
