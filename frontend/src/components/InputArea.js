import React, { useState } from "react";
import {
  Segment,
  Button,
  Grid,
  Image,
  Container,
  Dropdown,
  Select,
  Placeholder,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import { fetchResults, setLoading } from "../redux/result/resultActions";
import { connect } from "react-redux";
import modelInfo from "../constants";

const modelOptions = Object.keys(modelInfo).map((key) => {
  return {
    key: modelInfo[key].Model,
    text: modelInfo[key].Model,
    value: modelInfo[key].Model,
  };
});

const InputArea = (props) => {
  const fileInputRef = React.createRef();
  const dropdownref = React.createRef();
  const [status, setStatus] = useState("default");
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [modelName, setModelName] = useState("Select a model");

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setStatus("uploaded");
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleReset = () => {
    setStatus("default");
    setUploaded(false);
    setFile(null);
  };
  const onSelectChange = (e, data) => {
    console.log(e, data);
    const selectedVal = data.value;
    setModelName(selectedVal);
  };
  const onGenerateResult = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("image", file);
    bodyFormData.append("model_name", modelName);

    props.setLoading(true);
    axios({
      method: "post",
      url: "http://localhost:8000/result/",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      // handleReset();
      props.fetchResults();
    });
  };
  return (
    <div attached className="segment-box">
      <div style={{ padding: "20px" }}>
        <p>
          <strong> Caption generation</strong> is a challenging artificial
          intelligence problem where a textual description must be generated for
          a given photograph. It requires both methods from computer vision to
          understand the content of the image and a language model from the
          field of natural language processing to turn the understanding of the
          image into words in the right order. Recently, deep learning methods
          have achieved state-of-the-art results on examples of this problem.
        </p>
        <p>
          <strong> Instructions:</strong> Click on "Upoad Image" button to
          upload an image, select the model, and then click on "Generate
          Caption" button to get the caption result.
        </p>
      </div>

      <Grid columns={4} style={{ margin: "40px" }}>
        <Grid.Column
          width={8}
          verticalAlign="middle"
          centered
          style={{ padding: "5px 140px 5px 140px" }}
        >
          <div className="sth-btn">
            <Button
              fluid
              content="Upload image"
              labelPosition="left"
              size="medium"
              icon="file"
              onClick={() => fileInputRef.current.click()}
              basic
              color="blue"
            />
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={onFileChange}
            />
          </div>
          <div className="sth-btn">
            <Dropdown
              button
              className="icon"
              options={modelOptions}
              fluid
              className="ui basic blue button icon"
              color="blue"
              basic
              onChange={onSelectChange}
              text={modelName}
              style={{ textAlign: "center" }}
            />
            {/* <Dropdown
              selection
              button
              placeholder="Select model"
              // className="ui basic blue button"
              options={modelOptions}
              fluid
              size="medium"
              onChange={onSelectChange}
              // textAlign="center"
              // value={modelName}
              // style={{ textAlign: "center" }}
            /> */}
          </div>
          <div className="sth-btn">
            <Button
              fluid
              size="medium"
              icon="redo"
              labelPosition="left"
              content="Reset"
              onClick={handleReset}
              basic
              color="blue"
            />
          </div>
          <div className="sth-btn">
            <Button
              animated="fade"
              fluid
              size="medium"
              icon="setting"
              labelPosition="left"
              content="Generate caption"
              onClick={onGenerateResult}
              disabled={status != "uploaded"}
              basic
              color="blue"
            />
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <div>
            {/* <Image src={image} style={{ height: "300px" }} /> */}
            <p style={{ position: "relative", left: "150px" }}></p>
          </div>
          {status == "uploaded" ? (
            <div>
              <Image src={image} style={{ height: "300px" }} />
              <p style={{ position: "relative", left: "150px" }}></p>
            </div>
          ) : (
            <Placeholder style={{ height: "220px", textAlign: "center" }}>
              <Placeholder.Image />
              <strong>Image Not Uploaded</strong>
            </Placeholder>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
    setLoading: (value) => dispatch(setLoading(value)),
  };
};

export default connect(null, mapDispatchToProps)(InputArea);
