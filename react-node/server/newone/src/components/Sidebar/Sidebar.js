import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";
import isScreen from "../../core/screenHelper";
import { logoutUser } from "../../actions/auth";

import HomeIcon from "../../images/sidebar/Outline/Home";
import UserIcon from "../../images/sidebar/Outline/Person";
import BrowserIcon from "../../images/sidebar/Outline/Browser";
import EmailIcon from "../../images/sidebar/Outline/Email";
// import MessageCircleIcon from "../../images/sidebar/Outline/MessageCircle";
// import PersonIcon from "../../images/sidebar/Outline/Person";
// import PieChartIcon from "../../images/sidebar/Outline/PieChart";
// import GitIcon from "../../images/sidebar/Outline/Git";
// import { FaBrain } from "react-icons/fa";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
    activeItem: "",
  };

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  onMouseEnter() {
    if (!this.props.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    var img = new Image();
    img.onload = function() {
      console.log(this.width + " - " + this.height);
    };
    img.src = `https://devopslogos.s3.amazonaws.com/devops-default-logo.png`;

    return (
      <div
        className={`${
          !this.props.sidebarOpened && !this.props.sidebarStatic
            ? s.sidebarClose
            : ""
        } ${s.sidebarWrapper}`}
      >
        <nav
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className={s.root}
        >
          <header className={s.logo}>
            <a href="https://portal.ness-ie-practice.com/">
              {/* <span className={s.logoStyle}> */}
              <img
                style={{ width: "92%", height: "100%" }}
                src="https://devopslogos.s3.amazonaws.com/devops-default-logo.png"
              />
              {/* </span>  */}
            </a>
          </header>
          <ul className={s.nav}>
            <LinksGroup
              header="Home"
              link="/app/home"
              isHeader
              iconElement={<HomeIcon />}
            />

            <LinksGroup
              header="User Management"
              link="/app/userManagement"
              isHeader
              iconElement={<UserIcon />}
              index="userManagement"
            />
            <LinksGroup
              header="Message Center"
              link="/app/messageCenter"
              isHeader
              // iconElement={<EmailIcon />}
              index="messageCenter"
            />

            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="System Master"
              isHeader
              iconElement={<BrowserIcon />}
              link="/app/manage"
              index="manage"
              childrenLinks={[
                {
                  header: "Manage Acounts",
                  link: "/app/manage/accounts",
                },
                {
                  header: "Manage Assessment Area",
                  link: "/app/Manage/assessmentArea",
                },
                {
                  header: "Manage Business Unit",
                  link: "/app/manage/businessUnit",
                },
                {
                  header: "Manage Application",
                  link: "/app/manage/application",
                },

                {
                  header: "Manage Application Mapping",
                  link: "/app/manage/applicationMaping",
                },
                {
                  header: "Track Self Assessment Progress",
                  link: "/app/manage/assessmentProcess",
                },
                {
                  header: "Copy Self Assessment Scores",
                  link: "/app/manage/copySelfAssement",
                },
                {
                  header: "Categories-SubCategories Configuration",
                  link: "/app/manage/categories",
                },
              ]}
            />
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
    sidebarColor: store.layout.sidebarColor,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
