import React from "react";
import { Container, Part, Label } from "./style";

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
