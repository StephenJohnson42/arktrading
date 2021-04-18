<template class="setBackGround">
  <div class="setBackGround" >
    
      <div class="Custom-box">
      <h1> Ark Investing Trade Scheme </h1>
      <!--
        <li v-for="item in items" :key="item.message">
        {{ item.message }}
        </li>
      -->
       <!--<Button @click="loadTrades" class="p-button-raised">Load Trade</Button>-->
      
      <div class="p-p-4" style="padding:30px">
        <!--<Button @click="queryTrades" label="Button">Query Trade</Button>-->
      </div>
      <div class="card">
        <p style="color:black;font-size: 25px;"><strong>Methodology and Technologies</strong>
        </p>
        <p>
          <ul class="lists">
            <li >Trades generated using Python script which parsed Ark Funds Daily emailed .xls file.</li>
            <li >Buy prices found using Yahoo Finance API to find the Market Open Price of the Stocks bought by Ark Funds.</li>
            <li >Sell Prices found using same methodology and sold the next day.</li>
            <li >Web application hosted using AWS Amplify and S3 functionaly with GraphQL Backend to store the trades.</li>
            <li >Web Framework is the new version of VUE 3.</li>
				</ul>
        </p>
      </div>
        <div class="card">
          <DataTable :value="trades"  class="p-datatable-sm" :paginator="true" :rows="20">
                <Column field="FUND" header="Fund"></Column>
                <!--<Column field="Direction" header="Direction"></Column> -->
                <Column field="Ticker" header="Ticker" sortable="true"></Column>
                <!--<Column field="CUSIP" header="CUSIP"></Column> -->
                <Column field="Name" header="Name"></Column>
                <!--<Column field="Shares" header="Shares"></Column> -->
                <Column field="percETF" header="% ETF" bodyStyle="text-align:center"></Column>
                <Column field="entryDate" header="Entry Date" sortable="true" bodyStyle="text-align:center"></Column>
                <Column field="exitDate" header="Exit Date" sortable="true" bodyStyle="text-align:center"></Column>
                <Column field="entryPrice" header="Entry Price" sortable="true"></Column>
                <Column field="exitPrice" header="Exit Price" sortable="true"></Column>
                <Column field="percGain" header="% Gain" sortable="true"></Column>
            </DataTable>
        </div>
      <div style="padding:50px"></div>
      </div>
      <footer style="color:white;font-size: 18px; background-color:black; background-size: auto;">
		<p>Copyright &copy; 2020 Stephen Johnson
      <a href="https://stephengjohnson.com/">My Portfolio</a>
		</p>
	</footer>
  </div>
</template>

<script >
import { DataStore } from '@aws-amplify/datastore';
import { Trades } from './models';
import Papa from 'papaparse';

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      myStyle:{
        backgroundColor:"#16a085"
      },
      trades: [],
      tradesCopy: []
    }
  },
  created() {
    this.queryTrades();
    this.trimTrades();
  },
  methods:{
    async createTrades() {
        await DataStore.save(
          new Trades({
          "FUND": "Lorem ipsum dolor sit amet",
          "Direction": "Lorem ipsum dolor sit amet",
          "Ticker": "Lorem ipsum dolor sit amet",
          "CUSIP": "Lorem ipsum dolor sit amet",
          "Name": "Lorem ipsum dolor sit amet",
          "Shares": 1020,
          "percETF": 123.45,
          "entryDate": "Lorem ipsum dolor sit amet",
          "exitDate": "Lorem ipsum dolor sit amet",
          "entryPrice": 123.45,
          "exitPrice": 123.45,
          "percGain": 123.45
        })
      );
    },
    async queryTrades() {
        const models = await DataStore.query(Trades);
        this.trades = models;
        this.tradesCopy = this.trimTrades(this.trades);
        console.log(this.tradesCopy);
        console.log(this.trades);
    },
    async trimTrades(test) {
      let p2 = Object.assign({}, test);
      //console.log(p2);
      var jsonArr = [];
        for (var position in p2) {
          var slot0 = p2[position]["FUND"];
          //console.log(slot0);
          var slot1 = p2[position]["Direction"];
          //console.log(slot1);
          var slot2 = p2[position]["Ticker"];
          //console.log(slot2);
          var slot3 = p2[position]["CUSIP"];
          //console.log(slot3);
          var slot4 = p2[position]["Name"];
          //console.log(slot4);
          var slot5 = p2[position]["Shares"];
          //console.log(slot5);
          var slot6 = p2[position]["percETF"];
          slot6 = slot6.toFixed(2)
          //console.log(slot6);
          var slot7 = p2[position]["entryDate"];
          slot7  = slot7.substring(0,10);
          //console.log(slot7);
          var slot8 = p2[position]["exitDate"];
          slot8 = slot8.substring(0,10);
          //console.log(slot8);
          var slot9 = p2[position]["entryPrice"];
          slot9 = slot9.toFixed(2)
          //console.log(slot9);
          var slot10 = p2[position]["exitPrice"];
          slot10 = slot10.toFixed(2)
          //console.log(slot10);
          var slot11 = p2[position]["percGain"];
          slot11 = slot11.toFixed(2)
          //console.log(slot11);

          jsonArr.push({
            FUND: slot0.toString(),
            Direction: slot1.toString(),
            Ticker: slot2.toString(),
            CUSIP: slot3.toString(),
            Name: slot4.toString(),
            Shares: slot5.toString(),
            percETF: slot6.toString(),
            entryDate: slot7.toString(),
            exitDate: slot8.toString(),
            entryPrice: slot9.toString(),
            exitPrice: slot10.toString(),
            percGain: slot11.toString()
          });

        }
        console.log(jsonArr[0]);
        return jsonArr;
    },
    async loadTrades() {
      //this.createTrades();
        var count = 0
        Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSsix4EV_9Rsf3oHlP-WYmYtQEXFnYjLfbK3X0iLOT7DD1SPtDECMaEwqoiaFxEXnMhPs76yzI1TKRX/pub?output=csv", {
        download: true,
        step: function(row) {
          if(count != 0){
            console.log("Row:", row.data);
            console.log("Row:", row.data[0]);
            DataStore.save(
                new Trades({
                "FUND": row.data[0],
                "Direction": row.data[1],
                "Ticker": row.data[2],
                "CUSIP": row.data[3],
                "Name": row.data[4],
                "Shares": parseInt(row.data[5], 10),
                "percETF": parseFloat(row.data[6]),
                "entryDate": row.data[7],
                "exitDate": row.data[8],
                "entryPrice": parseFloat(row.data[9]),
                "exitPrice": parseFloat(row.data[10]),
                "percGain": parseFloat(row.data[11])
              })
            );
          }
          count++;
        },
        complete: function() {
          console.log("All done!");
        }     
      });
    }
  }
}
</script>

<style>

*{
    padding:0;
    margin:0;
}
.setBackGround {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  padding: 0px;		
  background: url("images/market.jpg") no-repeat center fixed; 
  background-size: cover;
  width: 100%;
  height: 100%;		
}

.lists{
  color: black;
  display: table; 
  margin: 0 auto; 
  text-align: left;
  font-size: 18px;
}

.Custom-box{
  color: white;
  font-size: 20px;

	border:3px #ffdf29c7 solid;
	background-color:rgba(114, 114, 114, 0.76);
  display: inline-block;
	padding-left:20px;
	padding-right:20px;
	padding-top:20px;
	padding-bottom:20px;
	margin-top:20px;
	margin-bottom:20px;
  width: 1000px;
  height: auto;

	box-shadow: 1px 4px 8px 1px black, 0 6px 20px 6px rgba(0, 0, 0, 0.4);
}


    .content-section {
        padding: 2rem;
    }
        .introduction {
            background-color: #f8f9fa;
            color: #495057;
            padding-bottom: 0;
            display: flex;
            align-items: top;
            justify-content: space-between;
        }

        .implementation {
            background-color: #f8f9fa;;
            color: #495057;
        }
            .documentation {
                padding-top: 0;
            }
        
    

    .card {
        background: #ffffff;
        padding: 2rem;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        border-radius: 4px;
        margin-bottom: 2rem;
    }



</style>
