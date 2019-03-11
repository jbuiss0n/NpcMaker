import React, { useCallback } from 'react';
import Attribute from '../../models/Attribute';

interface IMobileStatistics {
  Strength: Attribute;
  Dexterity: Attribute;
  Constitution: Attribute;
  Intelligence: Attribute;
  Wisdom: Attribute;
  Charisma: Attribute;
}

const MobileStatistics: React.FunctionComponent<IMobileStatistics> = (props) => {
  const {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charisma,
  } = props;

  const modifier = useCallback((attribute: Attribute) => {
    if (attribute.Modifier === 0)
      return '0';

    return `${attribute.Modifier > 0 ? '+' : '-'}${attribute.Modifier}`;
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <th>STR</th>
          <th>DEX</th>
          <th>CON</th>
          <th>INT</th>
          <th>WIS</th>
          <th>CHA</th>
        </tr>
        <tr>
          <td>{Strength.Value} ({modifier(Strength)})</td>
          <td>{Dexterity.Value} ({modifier(Dexterity)})</td>
          <td>{Constitution.Value} ({modifier(Constitution)})</td>
          <td>{Intelligence.Value} ({modifier(Intelligence)})</td>
          <td>{Wisdom.Value} ({modifier(Wisdom)})</td>
          <td>{Charisma.Value} ({modifier(Charisma)})</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MobileStatistics;

