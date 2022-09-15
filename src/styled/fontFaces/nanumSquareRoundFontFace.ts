import NanumSquareRoundBEot from '@r/fonts/NanumSquareRound/NanumSquareRoundB.eot';
import NanumSquareRoundBTtf from '@r/fonts/NanumSquareRound/NanumSquareRoundB.ttf';
import NanumSquareRoundBWoff from '@r/fonts/NanumSquareRound/NanumSquareRoundB.woff';
import NanumSquareRoundBWoff2 from '@r/fonts/NanumSquareRound/NanumSquareRoundB.woff2';
import NanumSquareRoundEBEot from '@r/fonts/NanumSquareRound/NanumSquareRoundEB.eot';
import NanumSquareRoundEBTtf from '@r/fonts/NanumSquareRound/NanumSquareRoundEB.ttf';
import NanumSquareRoundEBWoff from '@r/fonts/NanumSquareRound/NanumSquareRoundEB.woff';
import NanumSquareRoundEBWoff2 from '@r/fonts/NanumSquareRound/NanumSquareRoundEB.woff2';
import NanumSquareRoundLEot from '@r/fonts/NanumSquareRound/NanumSquareRoundL.eot';
import NanumSquareRoundLTtf from '@r/fonts/NanumSquareRound/NanumSquareRoundL.ttf';
import NanumSquareRoundLWoff from '@r/fonts/NanumSquareRound/NanumSquareRoundL.woff';
import NanumSquareRoundLWoff2 from '@r/fonts/NanumSquareRound/NanumSquareRoundL.woff2';
import NanumSquareRoundREot from '@r/fonts/NanumSquareRound/NanumSquareRoundR.eot';
import NanumSquareRoundRTtf from '@r/fonts/NanumSquareRound/NanumSquareRoundR.ttf';
import NanumSquareRoundRWoff from '@r/fonts/NanumSquareRound/NanumSquareRoundR.woff';
import NanumSquareRoundRWoff2 from '@r/fonts/NanumSquareRound/NanumSquareRoundR.woff2';
import css from 'styled-jsx/css';

export default css.global`
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
      url(${NanumSquareRoundRWoff2}) format('woff2'),
      url(${NanumSquareRoundRWoff}) format('woff'),
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
