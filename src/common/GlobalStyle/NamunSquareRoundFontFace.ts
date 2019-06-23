import {css} from 'styled-components';

import NanumSquareRoundBEot from '@/assets/fonts/NanumSquareRound/NanumSquareRoundB.eot';
import NanumSquareRoundBTtf from '@/assets/fonts/NanumSquareRound/NanumSquareRoundB.ttf';
import NanumSquareRoundBWoff from '@/assets/fonts/NanumSquareRound/NanumSquareRoundB.woff';
import NanumSquareRoundBWoff2 from '@/assets/fonts/NanumSquareRound/NanumSquareRoundB.woff2';
import NanumSquareRoundEBEot from '@/assets/fonts/NanumSquareRound/NanumSquareRoundEB.eot';
import NanumSquareRoundEBTtf from '@/assets/fonts/NanumSquareRound/NanumSquareRoundEB.ttf';
import NanumSquareRoundEBWoff from '@/assets/fonts/NanumSquareRound/NanumSquareRoundEB.woff';
import NanumSquareRoundEBWoff2 from '@/assets/fonts/NanumSquareRound/NanumSquareRoundEB.woff2';
import NanumSquareRoundLEot from '@/assets/fonts/NanumSquareRound/NanumSquareRoundL.eot';
import NanumSquareRoundLTtf from '@/assets/fonts/NanumSquareRound/NanumSquareRoundL.ttf';
import NanumSquareRoundLWoff from '@/assets/fonts/NanumSquareRound/NanumSquareRoundL.woff';
import NanumSquareRoundLWoff2 from '@/assets/fonts/NanumSquareRound/NanumSquareRoundL.woff2';
import NanumSquareRoundREot from '@/assets/fonts/NanumSquareRound/NanumSquareRoundR.eot';
import NanumSquareRoundRTtf from '@/assets/fonts/NanumSquareRound/NanumSquareRoundR.ttf';
import NanumSquareRoundRWoff from '@/assets/fonts/NanumSquareRound/NanumSquareRoundR.woff';
import NanumSquareRoundRWoff2 from '@/assets/fonts/NanumSquareRound/NanumSquareRoundR.woff2';

export default css`
@font-face {
    font-family: 'NanumSquareRound';
    font-weight: 300;
    src: url(${NanumSquareRoundLEot});
    src: local('NanumSquareRoundL'),
    url(${NanumSquareRoundLEot}?#iefix) format('embedded-opentype'),
    url(${NanumSquareRoundLWoff2}) format('woff2'),
    url(${NanumSquareRoundLWoff}) format('woff'),
    url(${NanumSquareRoundLTtf}) format('truetype');
}
@font-face {
 font-family: 'NanumSquareRound';
 font-weight: 400;
 src: url(${NanumSquareRoundREot});
 src: local('NanumSquareRoundR'),
      url(${NanumSquareRoundREot}?#iefix) format('embedded-opentype'),
      url(${NanumSquareRoundRWoff}) format('woff2'),
      url(${NanumSquareRoundRWoff2}) format('woff'),
      url(${NanumSquareRoundRTtf}) format('truetype');
}
@font-face {
 font-family: 'NanumSquareRound';
 font-weight: 700;
 src: url(${NanumSquareRoundBEot});
 src: local('NanumSquareRoundB'),
      url(${NanumSquareRoundBEot}?#iefix) format('embedded-opentype'),
      url(${NanumSquareRoundBWoff2}) format('woff2'),
      url(${NanumSquareRoundBWoff}) format('woff'),
      url(${NanumSquareRoundBTtf}) format('truetype');
}
@font-face {
 font-family: 'NanumSquareRound';
 font-weight: 800;
 src: url(${NanumSquareRoundEBEot});
 src: local('NanumSquareRoundEB'),
      url(${NanumSquareRoundEBEot}?#iefix) format('embedded-opentype'),
      url(${NanumSquareRoundEBWoff2}) format('woff2'),
      url(${NanumSquareRoundEBWoff}) format('woff'),
      url(${NanumSquareRoundEBTtf}) format('truetype');
}
`;
