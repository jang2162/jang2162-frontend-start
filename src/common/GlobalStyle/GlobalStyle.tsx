import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import NanumSquareFontFace from './NanumSquareFontFace';
import NanumSquareRoundFontFace from './NanumSquareRoundFontFace';

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    ${NanumSquareFontFace}
    ${NanumSquareRoundFontFace}
    
    * {
        font-family: NanumSquareRound NanumSquare !important;
    }
`;

export default GlobalStyle;
