import { useRef } from "react";
import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LoadingButton  from "../LoadingButton/LoadingButton";
import { errorLibrary } from "../ErrorLibrary";
import config from "../config";
import { API } from "aws-amplify";
import "./NewInkd.css";
import { S3UploadMiddleware } from "../S3UploadMiddleware";

export default function NewInkd() {
  const file = useRef(null);
  const history = useHistory();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return body.length > 0;
  }

  function handleFileChange(e) {
    file.current = e.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      const attachedFile = file.current ? await S3UploadMiddleware(file) : null;

      await createInkd({body, attachedFile});
      console.log("The body is " + body);
      console.log("An Inkd is created!");
      history.push("/");
    } catch (e) {
      errorLibrary(e);
      setIsLoading(false);
    }
  }

  function createInkd(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="newInkd">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="body">
          <FormControl
            value={body}
            as="textarea"
            onChange={(e) => setBody(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoadingButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoadingButton>
      </form>
    </div>
  );
}