import React, { Component } from "react";
import { IUserInfo } from "./App";
import fetch from "node-fetch";

interface IMatchCard {
  matchID: number;
  matchName: string;
  players: IUserInfo[];
  id?: string;
}

const playersMap: any = {
  player1: "player1",
  player2: "player2",
  player3: "player3",
  player4: "player4",
  player5: "player5",
  player6: "player6",
};

class MatchCard extends Component<any, any> {
  constructor(props: IMatchCard) {
    super(props);
    this.state = {
      players: [...props.players],
      freezed: props.id,
    };
  }

  updateValue(player: IUserInfo) {
    player.result = !player.result;
    this.setState({ ...this.state, ...player });
  }

  freezTheMatch() {
    const request = {
      matchID: this.props.matchID,
      matchName: this.props.matchName,
      players: this.state.players,
      timestamp: Date.now(),
      id: this.props.id,
    };

    this.setState({
      freezed: true,
    });

    fetch(`https://post-match.azurewebsites.net/api/post-match`, {
      method: "post",
      body: JSON.stringify(request),
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
    }).then(function (response: any) {
      console.log(response);
    });
  }

  Players(player: IUserInfo, index: number) {
    return (
      <div
        className={`match__player ${player.result ? "winner" : ""}`}
        key={index}
      >
        <div className="player-head">
          <label htmlFor="vehicle1">{playersMap[player.userName]}</label>
          {!this.state.freezed && (
            <input
              type="checkbox"
              id={player.userName}
              name={player.userName}
              checked={player.result}
              disabled={this.state.freezed}
              onChange={() => this.updateValue(player)}
            />
          )}
        </div>
        {this.state.freezed && this.props.tableInfo && (
          <span>{this.props.tableInfo.players[player.userName]}</span>
        )}
      </div>
    );
  }

  render() {
    const { matchName, players, matchID } = this.props;

    return (
      <div className={`match ${this.state.freezed ? "freezed" : ""}`}>
        <span className="match__id">Match Number {matchID + 1}</span>
        <span className="match__name">
          {matchName.split(",").join("  vs  ")}
        </span>
        <div className="match__players">
          {players.map((player: IUserInfo, index: number) => {
            return this.Players(player, index);
          })}
        </div>
        {!this.state.freezed && (
          <button onClick={() => this.freezTheMatch()}>Freeze</button>
        )}
      </div>
    );
  }
}

export default MatchCard;
