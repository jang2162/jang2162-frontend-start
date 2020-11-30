import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import fontFaces from './fontFace/fontFaces';

export const GlobalStyled = createGlobalStyle`
    ${reset}
    ${fontFaces}
    
    * {
        font-family: NanumSquareRound, NanumSquare !important;
    }
`;

