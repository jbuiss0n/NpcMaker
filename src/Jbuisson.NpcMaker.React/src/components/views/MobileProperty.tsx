import React from 'react';

interface IMobileProperty {
  Name: string;
  Description: string | number | boolean;
}

const MobileProperty: React.FunctionComponent<IMobileProperty> = (props) => {
  const { Name, Description } = props;

  return (
    <div className="mobile-property">
      <h4>{Name}: </h4>
      <p>{Description}</p>
    </div>
  );
}

export default MobileProperty;
