import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Grid, Header, Icon, Image, Segment } from "semantic-ui-react";
import { fetchResults } from "../redux/result/resultActions";

const ResultItem = ({ result }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={6}>
          <Image src={result.image} />
        </Grid.Column>
        <Grid.Column width={10}>
          <p>Generated caption: {result.caption}</p>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
const ResultList = (props) => {
  useEffect(() => {
    props.fetchResults();
  }, []);
  const resultList = props.state.results.map((result) => (
    <ResultItem result={result} key={result.id} />
  ));
  return (
    <Segment>
      <Header textAlign="center">
        Results {props.state.loading && <span>Loading...</span>}
      </Header>
      {resultList}
    </Segment>
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
