import React, { Component } from "react";
import { baseAmount, players } from "./data";
import emoji_1 from "./smile/emoji_1.gif";
import emoji_2 from "./smile/emoji_2.gif";
import emoji_3 from "./smile/emoji_3.gif";
import emoji_4 from "./smile/emoji_4.gif";
import emoji_5 from "./smile/emoji_5.gif";
import emoji_6 from "./smile/emoji_6.gif";
import emoji_7 from "./smile/emoji_7.gif";
import emoji_8 from "./smile/emoji_8.gif";
import emoji_9 from "./smile/emoji_9.gif";
import emoji_10 from "./smile/emoji_10.gif";
import emoji_11 from "./smile/emoji_11.gif";
import emoji_12 from "./smile/emoji_12.gif";
// import emoji_13 from "./smile/emoji_13.gif";
import emoji_14 from "./smile/emoji_14.gif";
import emoji_15 from "./smile/emoji_15.gif";
import emoji_16 from "./smile/emoji_16.gif";
// import emoji_17 from "./smile/emoji_17.gif";
// import emoji_18 from "./smile/emoji_18.gif";
// import emoji_19 from "./smile/emoji_19.gif";
import emoji_20 from "./smile/emoji_20.gif";
import emoji_21 from "./smile/emoji_21.gif";
import emoji_22 from "./smile/emoji_22.gif";
import emoji_23 from "./smile/emoji_23.gif";
import emoji_24 from "./smile/emoji_24.gif";
// import emoji_25 from "./smile/emoji_25.gif";
// import emoji_26 from "./smile/emoji_26.gif";
import emoji_27 from "./smile/emoji_27.gif";
import emoji_28 from "./smile/emoji_28.gif";

const emojiSet1 = [
  emoji_1,
  emoji_2,
  emoji_3,
  emoji_4,
  emoji_5,
  emoji_6,
  emoji_7,
  emoji_8,
  emoji_9,
  emoji_10,
  emoji_11,
  emoji_20,
  emoji_23,
];
const emojiSet2 = [
  emoji_12,
  emoji_14,
  emoji_15,
  emoji_16,
  emoji_21,
  emoji_22,
  emoji_24,
  emoji_27,
  emoji_28,
];

const playersMap: any = {
  player1: "GUDDI",
  player2: "BHAINA",
  player3: "MAMUNI APA",
  player4: "PRITI",
  player5: "RANJIT",
  player6: "MUKTI",
};

class MatchTable extends Component<any, any> {
  // constructor(props: any) {
  //     super(props);

  //   }

  getTableData(tableData: any) {
    var arr: any = [];
    while (arr.length < 6) {
      var r = Math.floor(Math.floor(Math.random() * emojiSet1.length - 1));
      if (arr.indexOf(r) === -1) arr.push(emojiSet1[r]);
    }
    console.log(arr);

    var arr1: any = [];
    while (arr1.length < 6) {
      var r = Math.floor(Math.floor(Math.random() * emojiSet2.length - 1));
      if (arr1.indexOf(r) === -1) arr1.push(emojiSet2[r]);
    }
    console.log(arr1);
    return (
      <table className="table-body">
        <tbody>
          {tableData.map((node: any, index: number) => {
            const amount: any = Object.values(node);
            return (
              <tr
                className={`${amount > 0 ? "green" : "red"} player-data`}
                key={index}
              >
                <th>
                  {amount > 0 ? (
                    <img src={arr[index]} alt="loading..." />
                  ) : (
                    <img src={arr1[index]} alt="loading..." />
                  )}
                </th>
                <th>{playersMap[Object.keys(node)[0]]}</th>
                <th className="bold">{Object.values(node)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    let tableData: any = [];
    if (this.props.tableState.length) {
      const totalAmount = this.props.tableState.length * baseAmount;
      const lastMatch = this.props.tableState.reduce((a: any, b: any) =>
        a.matchID > b.matchID ? a : b
      );

      tableData = players.map((player: string) => {
        return { [player]: lastMatch.players[player] - totalAmount };
      });

      tableData = tableData.sort((a: any, b: any) =>
        Number(Object.values(a)) < Number(Object.values(b)) ? 1 : -1
      );
    }

    return (
      <div className="match-table">
        {!!tableData && this.getTableData(tableData)}
      </div>
    );
  }
}

export default MatchTable;
