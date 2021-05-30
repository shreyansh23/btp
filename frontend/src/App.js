import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import { Container } from "semantic-ui-react";
import { MyHeader } from "./components/Header";
import InputArea from "./components/InputArea";
import ResultList from "./components/Results";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container fluid>
          <MyHeader title="Automated Image Captioning using Deep Learning" />
          <InputArea />
          <ResultList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
