import React from 'react';
import Mobile from '../../models/Mobile';
import MobileHeading from './MobileHeading'
import MobileProperty from './MobileProperty'
import MobileStatistics from './MobileStatistics'

interface IMobileCardProps {
  onClose?: () => void;

  Mobile: Mobile;
}

const MobileCard: React.FunctionComponent<IMobileCardProps> = (props) => {
  const {
    onClose,
    Mobile,
  } = props;

  return (
    <div className="mobile-card">
      <span onClick={onClose}>X</span>

      <MobileHeading {...Mobile} />

      <svg height="5" width="400"><polyline points="0,0 400,2.5 0,5"></polyline></svg>

      <MobileProperty Name="Armor class" Description={Mobile.ArmorRating} />
      <MobileProperty Name="Hit points" Description={`${Mobile.CurrentHitPoints}/${Mobile.MaxHitPoints}`} />
      <MobileProperty Name="Walking speed" Description={Mobile.WalkingSpeed} />

      <svg height="5" width="400"><polyline points="0,0 400,2.5 0,5"></polyline></svg>

      <MobileStatistics
        Strength={Mobile.Strength}
        Dexterity={Mobile.Dexterity}
        Constitution={Mobile.Constitution}
        Intelligence={Mobile.Intelligence}
        Wisdom={Mobile.Wisdom}
        Charisma={Mobile.Charisma} />

      <svg height="5" width="400"><polyline points="0,0 400,2.5 0,5"></polyline></svg>

    </div>
  );
}

export default MobileCard;
