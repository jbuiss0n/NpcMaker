import React, { Fragment } from 'react';

interface IMobileHeading {
  Name: string;
  Race: string;
  Gender?: boolean;
}

const MobileHeading: React.FunctionComponent<IMobileHeading> = (props) => {
  const { Name, Race, Gender } = props;

  return (
    <Fragment>
      <h1>{Name}</h1>
      <h2>{Race}, {Gender !== undefined && (Gender ? 'female' : 'male')}</h2>
    </Fragment>
  );
}

export default MobileHeading;
