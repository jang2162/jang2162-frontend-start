import {rgba} from 'polished';
import styled from 'styled-components';


export const Header = styled.header`
  z-index: 1;
  position: fixed;
  height: 48px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px ${rgba('#000', 0.25)};
  left: 0;
  right: 0;
`;

export const Aside = styled.aside`
  display: none;
  flex-basis: 0;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: ${rgba('#000', 0.05)};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  padding-top: 48px;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #f5f5f5;
`;
