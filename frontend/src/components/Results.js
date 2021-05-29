import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Container,
  Dimmer,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Segment,
} from "semantic-ui-react";
import { fetchResults } from "../redux/result/resultActions";

const ResultItem = ({ result }) => {
  return (
    <Container attached basic className="segment-box">
      <Grid>
        <Grid.Column width={4}>
          <Segment basic size="large">
            <Image src={result.image} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment basic size="large">
            <p>
              <b>ID:</b> {12}
            </p>
            <p>
              <b>Generated caption:</b> {result.caption}
            </p>
            <p>
              <b>Model used:</b> {"Xception"}
            </p>
            <p>
              <b>Model size:</b> {"6454 X 64546"}
            </p>
            <p>
              <b>Time taken:</b> {"4.0212 seconds"}
            </p>
            <p>
              <b>Generated link:</b> {"4.0212 seconds"}
            </p>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
const ResultList = (props) => {
  useEffect(() => {
    props.fetchResults();
  }, []);
  const resultList = props.state.results.map((result) => (
    <ResultItem result={result} key={result.id} />
  ));
  const loading = props.state.loading;
  return (
    <div style={{ margin: "" }}>
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader></Loader>
        </Dimmer>
        <Segment textAlign="center" color="black" inverted size="huge" basic>
          Results {props.state.loading && <span>loading...</span>}
        </Segment>
        {resultList}
      </Dimmer.Dimmable>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);
