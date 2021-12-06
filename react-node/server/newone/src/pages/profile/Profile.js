import React from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Label , Input , Button , Table } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { appLoading } from '../../actions/layout';
import ToolsConfig from '../../apis/ToolsConfigurator'

class Profile extends React.Component {
      constructor(props){
          super(props);
          this.state = {
            dropdownOpen : false,
            form : [],
            Selected : {},
            accessKeyId : "",
            secretAccessKey : "",
            username : "",
            password : "",
            authKeys : [],
            dropdownItems : [
              {
                "id" : "codecommit",
                "image" : "",
                "title" : "AWS Code Commit"
              },
              {
                "id" : "bitbucket",
                "image" : "",
                "title" : "Bitbucket"
              }
            ]
          }
          this.toggle = this.toggle.bind(this)

      }

        
      componentDidMount(){

          this.props.dispatch(appLoading(true))
          let ToolsAPI = new ToolsConfig()
          ToolsAPI.getToolsListOnType('version_control')
            .then(response =>{
                
                this.setState({'authKeys' : response })
                this.props.dispatch(appLoading(false));

            })
            .catch(error =>{

                this.props.dispatch(appLoading(false))

            })

      }

      toggle(){

          this.setState((state,props) =>{ return { dropdownOpen : !state.dropdownOpen } })
      }

      selectVersionControl(Version){

        this.setState({Selected : Version , form : Version.form })

      }

      OnDataChange(value){
          this.setState({ ...value })
      }

      SaveAuthKeys(versioncontrol){
        
        if(this.state.authKeys.findIndex(x => x.token_type === versioncontrol) === -1){

          this.props.dispatch(appLoading(true))
          let keys = this.state.authKeys
          let data = {}
          let ToolsAPI = new ToolsConfig()
  
          Promise.resolve(true)
            .then(response =>{
  
              if(versioncontrol === 'bitbucket' && this.state.username && this.state.password){
  
                data = { username : this.state.username , password : this.state.password ,  _default : keys.length <= 0 ? true : false }
                return ToolsAPI.postTokensToServer('bitbucket', data )
  
              }
              else if(this.state.accessKeyId && this.state.secretAccessKey){
  
                data = { accessKeyId : this.state.accessKeyId , secretAccessKey : this.state.secretAccessKey , _default : keys.length <= 0 ? true : false }
                return ToolsAPI.postTokensToServer('codecommit',data)
  
               }
  
            })
            .then(response =>{
  
              this.setState(prevState => ({ authKeys: [...prevState.authKeys, response['response'] ] , username : "" , password : "" , accessKeyId : "" , secretAccessKey : "" }))
              this.props.dispatch(appLoading(false))
  
            })
            .catch(error =>{
  
              this.props.dispatch(appLoading(false))
  
            });

        }else{

            toast.error(`Already configured for ${versioncontrol}` , {
              position: "top-left",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });

        }

      }

      setDefaultstate(){

        this.setState({
          Selected : {},
          accessKeyId : "",
          secretAccessKey : "",
          username : "",
          password : ""
        })
      }

      setDefaultCredentials(row){

        this.props.dispatch(appLoading(true))
        let ToolsAPI = new ToolsConfig()
        ToolsAPI.postTokensToServer('default', { "token_type" : row.token_type ,"tool_type" : row.tool_type })
          .then(response =>{

              let keys = this.state.authKeys.map(x => { return { ...x , default_flag : x.token_type === row.token_type ? true : false }})
              this.setState({ authKeys : keys })
              this.props.dispatch(appLoading(false))
          })
          .catch(error =>{

              console.log(error)
              this.props.dispatch(appLoading(false))
          })

      }

      deleteCredentials(row){

        this.props.dispatch(appLoading(true))
        let ToolsAPI = new ToolsConfig()
        ToolsAPI.deleteTokenFromServer({ token_type : row.token_type })
          .then(response =>{

              let Updated_Auth = this.state.authKeys.filter(x => x.token_id !== row['token_id'])
              this.setState({ authKeys : Updated_Auth })
              this.props.dispatch(appLoading(false))

          })
          .catch(error =>{

            console.log(error);
            this.props.dispatch(appLoading(false));

          })
      } 

      render(){

        return (
          <div>
            <Row>
              <Col md={8}>

              <Table>
                <thead>
                  <tr className="fs-sm">
                    <th>Tool Name</th>
                    <th>API Keys</th>
                    <th className="hidden-sm-down">Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.authKeys.map((row,index) => {

                        return <tr key={index}>
                                    <td style={{ fontWeight: "600" , textTransform: 'capitalize' }}>
                                      { row.token_type }
                                    </td>
                                    <td>
                                      <div style={{ fontWeight: "400" }}>
                                        {
                                          Object.keys(row.token_info).map((x,i) =>{
                                            if(x !== 'grantData' && x !== 'tool' && x !== 'access_token' && x !== 'default'){
                                              return <div key={`auth_${i}`}>{x} : {row.token_info[x]}</div>
                                            }else{
                                              return null
                                            }
                                          })
                                        }
                                      </div>
                                    </td>
                                    <td style={{ fontWeight: "600" }}>
                                      {
                                        row.default_flag ? <div style={{ textAlign: 'center' }}>Default</div> : <div>
                                          <Button color="primary" style={{ margin: "0px 3px" }} onClick={() => this.setDefaultCredentials({ ...row , index})}>Set Default</Button>
                                          <Button color="default" style={{ margin: "0px 3px" }} onClick={() => this.deleteCredentials({ ...row , index})}>Delete</Button>
                                        </div>
                                      }
                                    </td>
                                  </tr>
                      })
                  }
                </tbody>
              </Table>

              </Col>
              <Col md={4} style={{ borderLeft : '1px solid #0000001f' , minHeight: '400px'}}>
                  <div><h5>Set Up Verison Control</h5></div>
                    <Dropdown style={{  margin : '0px 10px' }} isOpen={this.state.dropdownOpen} toggle={() => this.toggle() }>
                        <DropdownToggle caret style={{ "background" :  "white" , color : 'black' }}>{ this.state.Selected && Object.keys(this.state.Selected).length > 0 ? `${ this.state.Selected.title }` : "Select Version Control Tool" } </DropdownToggle>
                            <DropdownMenu>
                                {
                                  this.state.dropdownItems.map(x => {
                                    return <DropdownItem key={x.id} onClick={() => this.selectVersionControl(x)}>{ x.title } </DropdownItem>
                                  })
                                }
                            </DropdownMenu>
                    </Dropdown>
                    <div>
                      {
                        (this.state.Selected && Object.keys(this.state.Selected).length > 0 && this.state.Selected.id === 'bitbucket' ? 

                                <div id="bitbucket">

                                        <div className="formMargin">
                                            <Label for="username">Username</Label>
                                            <Input id="username" name="username" onChange={(event) => { this.OnDataChange({"username": event.target.value}) } }/>
                                        </div>
                                        <div className="formMargin">
                                            <Label for="password">Password</Label>
                                            <Input id="password" name="password" onChange={(event) => { this.OnDataChange({"password": event.target.value})} }/>
                                        </div>
                                        <Button color="primary" onClick={() => this.SaveAuthKeys("bitbucket")}>Save Keys </Button>
                                  </div>

                              : this.state.Selected.id === 'codecommit' ?
                        
                                <div id="codecommit">
                                      <div className="formMargin">
                                          <Label for="accessKeyId">Access Key Id</Label>
                                          <Input id="accessKeyId" name="accessKeyId" onChange={(event) => { this.OnDataChange({"accessKeyId": event.target.value})} }/>
                                      </div>
                                      <div className="formMargin">
                                          <Label for="secretAccessKey">Secret Access Key</Label>
                                          <Input id="secretAccessKey" name="secretAccessKey" onChange={(event) => { this.OnDataChange({"secretAccessKey": event.target.value}) } }/>
                                      </div>
                                      <Button color="primary" onClick={() => this.SaveAuthKeys("codecommit")}>Save Keys</Button>
                                </div>

                              : null
                        
                        )

                      }
                    </div>
              </Col>
              </Row>
          </div>
        )
      }
}

function mapStateToProps(state) {

  return {
    versionControl: state.repo.versionControl
  };

}

export default withRouter(connect(mapStateToProps)(Profile));
