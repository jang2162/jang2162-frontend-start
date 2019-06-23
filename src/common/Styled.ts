import styled, {css} from 'styled-components';

interface ButtonProp {
    primary?: boolean
}

export const Button = styled.button<ButtonProp>`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  border: 2px solid palevioletred;
  color: palevioletred;
  
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
    border-color: palevioletred;
  `}
`;


export const FlexContainer = styled.div<{ vertical?: boolean, reverse?: boolean }>`
  display: flex;
  flex-direction: ${props => (props.vertical ? 'row' : 'column') + props.reverse ? '-reverse' : ''};
`;
