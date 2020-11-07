import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  width: ${props => props.width};
`;

export const Part = styled.div`
  width: 100%;
  height: 25px;
  
  background-color: ${props => props.backgroundColor};

  font-style: italic;
  font-size: 0.8em;
  line-height: 2em;
`;

export const Label = styled.span`
  font-size: 0.7em;
  font-style: italic;
`;