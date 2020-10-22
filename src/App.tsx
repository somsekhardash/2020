import React, { Component } from "react";
import "./App.css";
import { baseAmount, matches, players } from "./data";
import MatchCard from "./MatchCard";
import axios from "axios";
import MatchTable from "./MatchTable";
import PlayerCharts from "./PlayerCharts";

export interface IMatchInfo {
  matchName: string;
  matchID: number;
  players: Array<IUserInfo>;
}

export interface IUserInfo {
  userName: string;
  result: boolean;
}

class CreateMatch implements IMatchInfo {
  matchID: number;
  matchName: string;
  players: Array<IUserInfo> = [];
  id: string;
  constructor(
    matchName: string,
    matchID: number,
    playersArray: IUserInfo[],
    id: string
  ) {
    this.matchID = matchID;
    this.matchName = matchName;
    this.players = playersArray;
    this.id = id;
  }
}

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      appState: [],
      receivedState: [],
      tableState: [],
      temp: 0,
    };
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let username = params.get("admin");

    if (username === "som") {
      this.setState({
        temp: 15,
      });
    }

    this.getAllMatch()
      .then(() => {
        this.setState({
          appState: [...this.createobj()],
        });
      })
      .then(() => {
        const player: any = {};
        players.forEach((element) => {
          player[element] = 0;
        });

        var som = this.state.receivedState.map((node: any) => {
          const winners = node.players.filter((node: any) => {
            return node.result;
          });

          const priceAmount =
            (node.players.length * baseAmount) / winners.length;

          node.players.forEach((node: any) => {
            if (node.result) {
              player[node.userName] = player[node.userName] + priceAmount;
            }
          });
          return {
            matchID: node.matchID,
            players: { ...player },
          };
        });

        this.setState({
          tableState: [...som],
        });
      });
  }

  getPlayerArray(index: number) {
    var result = this.state.receivedState.find((node: any) => {
      return node.matchID === index;
    });
    if (result) {
      return [...result.players];
    } else {
      return players.map((node: string) => {
        return {
          userName: node,
          result: false,
        } as IUserInfo;
      });
    }
  }

  getPlayerID(index: number) {
    var result = this.state.receivedState.find((node: any) => {
      return node.matchID === index;
    });
    if (result) {
      return result.id;
    } else {
      return null;
    }
  }

  createobj() {
    return matches.map(
      (node: string, index: number): IMatchInfo => {
        return new CreateMatch(
          node,
          index,
          this.getPlayerArray(index),
          this.getPlayerID(index)
        );
      }
    );
  }

  getAllMatch() {
    return axios
      .get("https://post-match.azurewebsites.net/api/get-match")
      .then((response: any) => {
        this.setState({
          receivedState: [...response.data],
        });
      });
  }

  render() {
    return (
      <div className="content">
        {this.state.temp === 15 &&
          this.state.appState.map((match: IMatchInfo, index: number) => {
            const tableInfo = this.state.tableState.find((node: any) => {
              return node.matchID === match.matchID;
            });
            return <MatchCard {...match} key={index} tableInfo={tableInfo} />;
          })}
        {this.state.temp !== 15 && (
          <div className="show">
            <MatchTable tableState={this.state.tableState} />
            <div className="chart">
              <PlayerCharts tableState={this.state.tableState}></PlayerCharts>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
