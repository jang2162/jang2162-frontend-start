import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import NamunSquareFontFace from './NamunSquareFontFace';
import NamunSquareRoundFontFace from './NamunSquareRoundFontFace';

const GlobalStyle = createGlobalStyle`
    ${reset}
    ${NamunSquareFontFace}
    ${NamunSquareRoundFontFace}

    * {
        font-family: NanumSquareRound NanumSquare !important;
    }
`;

export default GlobalStyle;
