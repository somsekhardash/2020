import React, { Component } from 'react';
import { baseAmount,players } from "./data";

const playersMap:any = {
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
    
    getTableData (tableData: any) {
        return (<table className="table-body">
            {tableData.map((node: any, index: number)=> {
             const amount: any = Object.values(node);
            return (<tr className={`${amount > 0 ? 'green' : 'red'} player-data`} key={index}>
                <th>{playersMap[Object.keys(node)[0]]}</th>
                <th className="bold">{Object.values(node)}</th>
            </tr>)
        })}
        </table>)
        
    }
    
    render() {
        let tableData: any = [];
        if(this.props.tableState.length) {
            const totalAmount = this.props.tableState.length * baseAmount; 
            const lastMatch = this.props.tableState.reduce((a: any, b: any) => a.matchID > b.matchID ? a : b);

            tableData = players.map((player: string) => {
                return {[player]: lastMatch.players[player]- totalAmount}
            });

            tableData = tableData.sort((a: any, b: any) => ( Number(Object.values(a)) < Number(Object.values(b))) ? 1 : -1)
            console.log(tableData);
        }

        return (
            <div className="match">
                {!!tableData && this.getTableData(tableData) }
            </div>
        );
    }
}

export default MatchTable;