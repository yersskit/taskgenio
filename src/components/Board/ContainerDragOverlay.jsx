import React from "react";
import { Container } from "./Container";
import { Item } from "./Item";

const ContainerDragOverlay = ({ containerId, items }) => {
  return (
    <Container
      label={`Column ${containerId}`}
      style={{
        height: "100%",
        width: "100%",
      }}
      shadow
      unstyled={false}
    >
      {items[containerId].map((item) => (
        <Item key={item.id} value={item.id} />
      ))}
    </Container>
  );
};

export default ContainerDragOverlay;
