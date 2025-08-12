import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

import {color} from '../../component/style';

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={(props.style && props.style.fontSize) || 21}
    height={(props.style && props.style.fontSize) || 21}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke={(props.style && props.style.color) || color.textBase}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M19.667 14.167 16.333 17.5m0 0L13 14.167m3.333 3.333V5.833A3.333 3.333 0 0 0 13 2.5h-1.667m-10 3.333L4.667 2.5m0 0L8 5.833M4.667 2.5v11.667A3.333 3.333 0 0 0 8 17.5h1.667"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M21 0v21H0V0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
