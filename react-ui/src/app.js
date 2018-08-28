import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import superagent from 'superagent';
import './app.css';
import Spinner from './spinner';
import Predictions from './predictions';
import UploadTarget from './upload-target';
import {Select} from 'antd';
import ModelParamsForm from './ModelParamsForm';




class App extends Component {

  state = {
    files: [],
    isProcessing: false,
    uploadError: null,
    uploadResponse: null,
      modelParams: null
  };

  //选择模型
    onSelModel = (error, value)=>{

        if (error) {
            this.setState({
                modelParams: null
            });
        }else {

            var req = superagent.post('/model');
    
            req.field("CUSTOM_MODEL_ID", value.CUSTOM_MODEL_ID);
            req.field("EINSTEIN_VISION_ACCOUNT_ID", value.EINSTEIN_VISION_ACCOUNT_ID);
            req.field("EINSTEIN_VISION_PRIVATE_KEY", value.EINSTEIN_VISION_PRIVATE_KEY);

            console.log('modelParams',value);

            req.end((err,res) => {
                this.setState({ isProcessing: false });
                if (err) {
                console.log('file-upload error', err);
                //this.setState({ uploadError: err.message });
                return;
                }
                console.log('file-upload response====>', res);
                value.token = res.text;

                this.setState({
                    modelParams: value
                });
                //this.setState({ uploadResponse: JSON.parse(res.text) });
            });

        }

    };

  render() {
    const file = this.state.files[0];
    const uploadError = this.state.uploadError;
    const isProcessing = this.state.isProcessing;
    const response = this.state.uploadResponse;
    const predictions = (response && response.probabilities) || [];


    const maskProps = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left:0, top:0,
        background: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontSize: 30,
        color: '#000',
        lineHeight: '388px'
    };
    const modelParams = this.state.modelParams;

    return (
      <div>
        <div className="title">
          <h1 className="intro">
             Einstein Vision Demo
             <div className="detail">of the General Image Classifier</div>
          </h1>
        </div>
          <div>
              <div style={{width: '49%', float: 'left', color: '#000', padding: 10}}>
                  <ModelParamsForm onSelModel={this.onSelModel}/>
              </div>
              <div style={{width: '49%', float: 'left', position: 'relative'}}>
                  <div className={classNames(
                      "app",
                      file != null ? "app-with-image" : null)}>
                      {response || isProcessing ? null : <Dropzone
                          accept={'image/png, image/jpeg'}
                          multiple={false}
                          onDrop={this.onDrop}
                          style={{}}
                          className={classNames(
                              'dropzone','initial-dropzone',
                              file != null ? 'dropzone-dropped' : null
                          )}
                          activeClassName="dropzone-active"
                          rejectClassName="dropzone-reject">
                          <UploadTarget/>
                      </Dropzone>}


                      <Dropzone
                          accept={'image/png, image/jpeg'}
                          multiple={false}
                          onDrop={this.onDrop}
                          style={{}}
                          className={classNames(
                              'dropzone',
                              file != null ? 'dropzone-dropped' : null
                          )}
                          activeClassName="dropzone-active"
                          rejectClassName="dropzone-reject">
                          <div className="result-wrapper">
                              <div className={classNames(
                                  'image-preview',
                                  file != null ? 'image-preview-visible' : null)}>

                                  {isProcessing || response ? <img
                                      alt="Upload preview"
                                      src={file && file.preview}
                                      style={{ display: 'block' }}/> : null}
                                  {!response || isProcessing ? null :
                                      <div className="prompt">Drop or tap to upload another.</div>
                                  }
                                  <div className="spinner-wrapper">
                                      {isProcessing
                                          ? <span><Spinner/><div className="spinner-text">Analyzing Image...</div></span>
                                          : null}
                                      {uploadError
                                          ? uploadError
                                          :null}
                                  </div>
                              </div>

                              <Predictions contents={predictions}/>
                          </div>
                      </Dropzone>
                  </div>
                  {modelParams ===null ?
                      <div style={maskProps}>
                          请先选择模型，并设置模型参数
                      </div>
                      :null}

              </div>

          </div>


        <div className="footer">
          <a href="https://github.com/heroku/einstein-vision-node">GitHub</a>
          <a href="https://metamind.readme.io/v1/docs">API Docs</a>
        </div>
      </div>
    );
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
      const modelParams = this.state.modelParams;
    if (acceptedFiles.length) {
      this.setState({
        isProcessing: true,
        files: acceptedFiles,
        uploadError: null,
        uploadResponse: null
      });

      var req = superagent.post('/file-upload');
      acceptedFiles.forEach((file)=> {
        // Backend expects 'file' reference
        req.attach('file', file, file.name);

        //添加模型参数
            /*.field("CUSTOM_MODEL_ID", modelParams.CUSTOM_MODEL_ID)
            .field("EINSTEIN_VISION_ACCOUNT_ID", modelParams.EINSTEIN_VISION_ACCOUNT_ID)
            .field("EINSTEIN_VISION_PRIVATE_KEY", modelParams.EINSTEIN_VISION_PRIVATE_KEY)*/
      });
        req.field(modelParams);
        console.log('modelParams',modelParams);

      req.end((err,res) => {
        this.setState({ isProcessing: false });
        if (err) {
          console.log('file-upload error', err);
          this.setState({ uploadError: err.message });
          return;
        }
        console.log('file-upload response', res);
        this.setState({ uploadResponse: JSON.parse(res.text) });
      });
    }
  }
}

export default App;
