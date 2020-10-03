import NanumSquareBEot from '@r/fonts/NanumSquare/NanumSquareB.eot';
import NanumSquareBTtf from '@r/fonts/NanumSquare/NanumSquareB.ttf';
import NanumSquareBWoff from '@r/fonts/NanumSquare/NanumSquareB.woff';
import NanumSquareBWoff2 from '@r/fonts/NanumSquare/NanumSquareB.woff2';
import NanumSquareEBEot from '@r/fonts/NanumSquare/NanumSquareEB.eot';
import NanumSquareEBTtf from '@r/fonts/NanumSquare/NanumSquareEB.ttf';
import NanumSquareEBWoff from '@r/fonts/NanumSquare/NanumSquareEB.woff';
import NanumSquareEBWoff2 from '@r/fonts/NanumSquare/NanumSquareEB.woff2';
import NanumSquareLEot from '@r/fonts/NanumSquare/NanumSquareL.eot';
import NanumSquareLTtf from '@r/fonts/NanumSquare/NanumSquareL.ttf';
import NanumSquareLWoff from '@r/fonts/NanumSquare/NanumSquareL.woff';
import NanumSquareLWoff2 from '@r/fonts/NanumSquare/NanumSquareL.woff2';
import NanumSquareREot from '@r/fonts/NanumSquare/NanumSquareR.eot';
import NanumSquareRTtf from '@r/fonts/NanumSquare/NanumSquareR.ttf';
import NanumSquareRWoff from '@r/fonts/NanumSquare/NanumSquareR.woff';
import NanumSquareRWoff2 from '@r/fonts/NanumSquare/NanumSquareR.woff2';
import {css} from 'styled-components';

export default css`
@font-face {
    font-family: 'NanumSquare';
    font-weight: 300;
    src: url(${NanumSquareLEot});
    src: local('NanumSquareL'),
    url(${NanumSquareLEot}?#iefix) format('embedded-opentype'),
    url(${NanumSquareLWoff2}) format('woff2'),
    url(${NanumSquareLWoff}) format('woff'),
    url(${NanumSquareLTtf}) format('truetype');
}
@font-face {
 font-family: 'NanumSquare';
 font-weight: 400;
 src: url(${NanumSquareREot});
 src: local('NanumSquareR'),
      url(${NanumSquareREot}?#iefix) format('embedded-opentype'),
      url(${NanumSquareRWoff}) format('woff2'),
      url(${NanumSquareRWoff2}) format('woff'),
      url(${NanumSquareRTtf}) format('truetype');
}
@font-face {
 font-family: 'NanumSquare';
 font-weight: 700;
 src: url(${NanumSquareBEot});
 src: local('NanumSquareB'),
      url(${NanumSquareBEot}?#iefix) format('embedded-opentype'),
      url(${NanumSquareBWoff2}) format('woff2'),
      url(${NanumSquareBWoff}) format('woff'),
      url(${NanumSquareBTtf}) format('truetype');
}
@font-face {
 font-family: 'NanumSquare';
 font-weight: 800;
 src: url(${NanumSquareEBEot});
 src: local('NanumSquareEB'),
      url(${NanumSquareEBEot}?#iefix) format('embedded-opentype'),
      url(${NanumSquareEBWoff2}) format('woff2'),
      url(${NanumSquareEBWoff}) format('woff'),
      url(${NanumSquareEBTtf}) format('truetype');
}
`;
