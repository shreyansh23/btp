import React, { useState } from "react";
import { Segment, Button, Grid, Image, Container } from "semantic-ui-react";
import axios from "axios";
import { fetchResults, setLoading } from "../redux/result/resultActions";
import { connect } from "react-redux";

const InputArea = (props) => {
  const fileInputRef = React.createRef();
  const [status, setStatus] = useState("default");
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
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
  const onGenerateResult = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("image", file);
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
    <div>
      <Segment>
        <p>
          In the past few years, the problem of generating descriptive sentences
          automatically for images has garnered a rising interest in natural
          language processing and computer vision research. The generation of
          captions from images has various practical benefits, ranging from
          aiding the visually impaired, to enabling the automatic and
          cost-saving labelling of the millions of images uploaded to the
          Internet every day. Image captioning is a fundamental task which
          requires semantic understanding of images and the ability of
          generating description sentences with proper and correct structure. At
          present images are annotated with human intervention and it becomes a
          nearly impossible task for huge commercial databases.
        </p>
        <Grid>
          <Grid.Column width={8}>
            <Container>
              <Button
                content="Upload image"
                labelPosition="left"
                size="large"
                icon="file"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={onFileChange}
              />
              <Button
                size="large"
                icon="redo"
                labelPosition="left"
                content="Reset"
                onClick={handleReset}
              />
              <Button
                size="large"
                icon="setting"
                labelPosition="left"
                content="Generate caption"
                onClick={onGenerateResult}
                disabled={status != "uploaded"}
              />
            </Container>
          </Grid.Column>
          <Grid.Column width={8}>
            {status == "uploaded" ? (
              <div>
                <Image src={image} style={{ width: "400px" }} />
                Uploaded Image
              </div>
            ) : null}
          </Grid.Column>
        </Grid>
      </Segment>
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
