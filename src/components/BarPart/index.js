import React from "react";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  width: ${props => props.width};
`;

const Part = styled.div`
  width: 100%;
  height: 25px;
  
  background-color: ${props => props.backgroundColor};

  font-style: italic;
  font-size: 0.8em;
  line-height: 2em;
`;

const Label = styled.span`
  font-size: 0.7em;
  font-style: italic;
`;

export default function BarPart(props) {
  return (
    <Container width={props.width}>
      <Part backgroundColor={props.backgroundColor}>
        {props.width}
      </Part>
      <Label>{props.label}</Label>
    </Container>
  );
}