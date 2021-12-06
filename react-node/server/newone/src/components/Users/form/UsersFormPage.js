import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap'
import { toast } from 'react-toastify';
import { appLoading } from '../../../actions/layout'
import ToolAPI from '../../../apis/ToolsConfigurator'
import './index.css'
class UsersFormPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      file: null,
      file_details: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.UploadImage = this.UploadImage.bind(this)
  }

  handleChange(event) {
    this.setState({ file: URL.createObjectURL(event.target.files[0]), file_details : event.target.files[0] })

    var img = new Image();
    img.onload = function(){
        console.log( this.width+' - '+ this.height );
    };
    img.src = URL.createObjectURL(event.target.files[0]);
  }

  UploadImage(){

    this.props.dispatch(appLoading(true));

    var formData = new FormData()
    formData.append('logo', this.state.file_details);
    let Tool= new ToolAPI()
    Tool.postInfoToAPI('upload_logo',formData)
          .then(response =>{

            toast.success(`Successfully Updated Logo`, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true
              });
            this.setState({ accessKeyId : "" , secretAccessKey : "" })
            this.props.dispatch(appLoading(false))
        })
        .catch(error =>{

              toast.error(error.message, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true
              });
              this.props.dispatch(appLoading(false))
        })
  }

  render() {
    return (
      <React.Fragment>
          <div className="page-top-line">
            <h2 className="page-title">Logo - <span className="fw-semi-bold">Edit</span></h2>
          </div>
          <div>
          <div className="avatar-upload">
              <div className="avatar-edit">
                  <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg, .svg" onChange={this.handleChange}/>
                  <label htmlFor="imageUpload"> </label>
              </div>
              <div className="avatar-preview">
                  <div id="imagePreview" style={{ 'backgroundImage' : `url(${this.state.file})` }}>
                  </div>
              </div>
              <div style={{ margin: '15px' , textAlign: 'center' }}>
                <Button color='primary' onClick={this.UploadImage}>Upload Logo</Button>
              </div>
          </div>
          </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    
  };
}

export default connect(mapStateToProps)(UsersFormPage);
