import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'

import s from './ListGroup.module.scss';

import Jenkins from '../../../apis/JenkinsAPI'
import ToolsAPI from '../../../apis/ToolsConfigurator'
import { appLoading } from '../../../actions/layout';


class NotificationsDemo extends React.Component {

  constructor(props){

    super(props);
    this.state = {
        Notifications : [],
        Notification_Loading : false
    }
  }

  componentDidMount(){
        
    this.FetchNotifications();

  }
  
  FetchNotifications(){
    
    let Tools = new ToolsAPI();
    this.setState({ Notification_Loading : true });
    Tools.getInfoFromAPI('notifications',{})
      .then(response =>{
    
          let Notifications = _.orderBy(response['response'],['created_at'],['desc'])
          this.setState({ Notifications , Notification_Loading : false })
  
      })
      .catch(error =>{
  
          console.log(error)
          this.setState({ Notification_Loading : false })
      })

  }

  HandlePipeline(type,notification,notification_id){
      
      this.props.dispatch(appLoading(true))
      let JenkinsAPI = new Jenkins()
      JenkinsAPI.fetchPostFromAPI('approve',{ "notification_id" : notification_id , "input" : notification.input, "build_id" : notification.build_id , "pipeline" : notification.pipeline_name, "status" : type === 'deny' ? 'No' : 'Yes' })
            .then(response =>{

                console.log(response)
                toast.success(`${type === 'deny' ? 'Pipeline Input Denied ' : 'Pipeline Input Approved' }`, {  position: "top-left", autoClose: 5000,
                                                        closeOnClick: true, pauseOnHover: false, draggable: true });
                this.props.dispatch(appLoading(false))
                this.FetchNotifications()

            })
            .catch(error =>{

                console.log(error)
                
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

      <>
        {
          this.state.Notification_Loading ?
          <div style={{ "textAlign" : 'center' }}>
              <div className="notification-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
          </div> :
          <ListGroup className={[s.listGroup, 'thin-scroll'].join(' ')}>

            {
              this.state.Notifications.map(x =>{
                  return (
                    <ListGroupItem className={s.listGroupItem} key={x.notification_id}>
                      <div className="m-0 overflow-hidden">
                        Approval For <b> {  x.notification_data.pipeline_name  } </b> 
                        {
                          x.notification_data.status === '0' ?
                          <>
                            is requested
                            &nbsp;&nbsp;
                            <div style={{ textAlign: 'center' , marginTop: '6px'}}>
                              <Button size="xs" color="success" className="mr-1" onClick={() => this.HandlePipeline('approve',x.notification_data , x.notification_id )}>Approve</Button>
                              <Button size="xs" color="danger" onClick={() => this.HandlePipeline('deny',x.notification_data,x.notification_id) }>Deny</Button>
                            </div>
                          </> :
                          x.notification_data.status === '1' ?
                          <>has been approved </> : <>has been rejected</> 

                        }
                        <time className="help-block m-0">
                          { new Date(x.created_at).toLocaleDateString() } , { new Date(x.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' ,hour12: true }) }
                        </time>
                      </div>
                    </ListGroupItem>
                  )
              })
            }
          </ListGroup>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,

  };
}

export default withRouter(connect(mapStateToProps)(NotificationsDemo));
