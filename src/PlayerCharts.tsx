import React from "react";
import { Line } from "react-chartjs-2";
import { players } from "./data";

const playersMap: any = {
  player1: "player1",
  player2: "player2",
  player3: "player3",
  player4: "player4",
  player5: "player5",
  player6: "player6",
};

export default class App extends React.Component<any, any> {
  render() {
    const labels = this.props.tableState.map((node: any) => node.matchID);
    const colous = ["red", "green", "blue", "Purple", "gray", "orange"];
    const datas = players.map((player) => {
      return this.props.tableState.map((node: any) => {
        return node.players[player];
      });
    });

    console.log(labels);

    const datasets = players.map((player, index) => {
      return {
        data: datas[index],
        label: playersMap[player],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: colous[index],
        borderWidth: 2,
      };
    });

    // players.map((player: string) => {
    //     return this.props.tableState.map((node: any) => {
    //         node.players.find((item: any) => item.userName === player )
    //     });
    // })

    const state = {
      labels: labels,
      datasets: datasets,
    };

    return (
      <Line
        data={state}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: "2020",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    );
  }
}

// width={1500}
// height={600}
