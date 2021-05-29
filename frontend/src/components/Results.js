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
import modelInfo from "../constants";

const ResultItem = ({ result }) => {
  console.log(result);
  var modelName = result.model_name;
  if (!Object.keys(modelInfo).includes(result.model_name)) {
    modelName = "Xception";
  }
  const size = modelInfo[modelName]["Size"];
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
              <b>Generated caption:</b> {result.caption}
            </p>
            <p>
              <b>Model used:</b> {result.model_name}
            </p>
            <p>
              <b>Model size:</b> {size}
            </p>
            <p>
              <b>Time taken:</b> {"4.0212 seconds"}
            </p>
            <p>
              <b>Generated link:</b> <a href={result.url}>{result.url}</a>
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
