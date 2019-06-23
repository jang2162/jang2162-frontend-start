import {css} from 'styled-components';

import NanumSquareBEot from '@/assets/fonts/NanumSquare/NanumSquareB.eot';
import NanumSquareBTtf from '@/assets/fonts/NanumSquare/NanumSquareB.ttf';
import NanumSquareBWoff from '@/assets/fonts/NanumSquare/NanumSquareB.woff';
import NanumSquareBWoff2 from '@/assets/fonts/NanumSquare/NanumSquareB.woff2';
import NanumSquareEBEot from '@/assets/fonts/NanumSquare/NanumSquareEB.eot';
import NanumSquareEBTtf from '@/assets/fonts/NanumSquare/NanumSquareEB.ttf';
import NanumSquareEBWoff from '@/assets/fonts/NanumSquare/NanumSquareEB.woff';
import NanumSquareEBWoff2 from '@/assets/fonts/NanumSquare/NanumSquareEB.woff2';
import NanumSquareLEot from '@/assets/fonts/NanumSquare/NanumSquareL.eot';
import NanumSquareLTtf from '@/assets/fonts/NanumSquare/NanumSquareL.ttf';
import NanumSquareLWoff from '@/assets/fonts/NanumSquare/NanumSquareL.woff';
import NanumSquareLWoff2 from '@/assets/fonts/NanumSquare/NanumSquareL.woff2';
import NanumSquareREot from '@/assets/fonts/NanumSquare/NanumSquareR.eot';
import NanumSquareRTtf from '@/assets/fonts/NanumSquare/NanumSquareR.ttf';
import NanumSquareRWoff from '@/assets/fonts/NanumSquare/NanumSquareR.woff';
import NanumSquareRWoff2 from '@/assets/fonts/NanumSquare/NanumSquareR.woff2';

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
