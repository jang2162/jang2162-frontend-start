import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import fontFaces from './fontFace/fontFaces';

const GlobalStyleComponent = createGlobalStyle`
    ${reset}
    ${fontFaces}
    
    * {
        font-family: NanumSquareRound NanumSquare !important;
    }
`;

export default GlobalStyleComponent;
