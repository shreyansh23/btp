import { Segment } from "semantic-ui-react";

export const MyHeader = ({ title }) => {
  return (
    <Segment
      textAlign="center"
      color="black"
      inverted
      size="huge"
      basic
      attached
    >
      {title}
    </Segment>
  );
};
