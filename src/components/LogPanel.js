import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";
import { updateHost } from "./HostInfo";
let logs = [];

export default class LogPanel extends React.Component {
  state = {
    allActive: false
  };

  triggerLogs = (action, status) => {
    switch (action) {
      case "allActivate": {
        logs.unshift(Log.warn("ALL ACTIVIATED"));
        Promise.all(
          this.props.hosts.map(host => updateHost("active", status, host.id))
        ).then(() => this.props.setAllStatus(status));
        this.setState({ allActive: !this.state.allActive });
        break;
      }
      case "allUnactivate": {
        logs.unshift(Log.warn("ALL DEACTIVATED"));
        Promise.all(
          this.props.hosts.map(host => updateHost("active", status, host.id))
        ).then(() => this.props.setAllStatus(status));
        this.setState({ allActive: !this.state.allActive });
        break;
      }
      case "oneActive":
        logs.unshift(Log.notify("Host going ACTIVE"));
        break;

      case "oneUnactive":
        logs.unshift(Log.notify("Host DEACTIVATED"));
        break;
      default:
        console.log("LOG: *error* ");
    }
    return logs;
  };

  triggerStatusAll = () => {
    this.state.allActive
      ? this.triggerLogs("allUnactivate", false)
      : this.triggerLogs("allActivate", true);
  };

  render() {
    return (
      <Segment className="HQComps" id="logPanel">
        <pre>
          {logs.map((log, i) => (
            <p key={i} className={log.type}>
              {log.msg}
            </p>
          ))}
        </pre>
        <Button
          fluid
          color={this.state.allActive ? "green" : "red "}
          content={this.state.allActive ? "DEACTIVATE ALL" : "ACTIVATE ALL"}
          onClick={() => this.triggerStatusAll()}
        />
      </Segment>
    );
  }
}
