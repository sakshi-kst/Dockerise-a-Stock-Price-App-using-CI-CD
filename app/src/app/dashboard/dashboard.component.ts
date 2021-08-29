import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.displayData();
  }

  displayData() {
    const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=IN&language=en';
    const headers = new HttpHeaders({'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    'x-rapidapi-key': '27a54e9ba6msh718b7fee6da4c49p1342bbjsn4b375822cb79', 'useQueryString': 'true'});

    this.httpClient.get(url, {headers: headers}).subscribe(
        (data) => {          
          const BSE = data['marketSummaryResponse']['result']['0'];
          const bseString = '<span style="color:black;"> Exchange name: </span>' + BSE['fullExchangeName'] + '<br>' +
          '<span style="color:black;"> Market time: </span>' + BSE['regularMarketTime']['fmt'] + '<br>' +
          '<span style="color:black;"> Market price: </span>' + BSE['regularMarketPrice']['fmt'] + '<br>' +
          '<span style="color:black;"> Market close: </span>' + BSE['regularMarketPreviousClose']['fmt'] + '<br>' +
          '<span style="color:black;"> Percent change: </span>' + BSE['regularMarketChangePercent']['fmt'] + '<br>';

          const NSE = data['marketSummaryResponse']['result']['1'];
          const nseString = '<span style="color:black;"> Exchange name: </span>' + NSE['fullExchangeName'] + '<br>' +
          '<span style="color:black;"> Market time: </span>' + NSE['regularMarketTime']['fmt'] + '<br>' +
          '<span style="color:black;"> Market price: </span>' + NSE['regularMarketPrice']['fmt'] + '<br>' +
          '<span style="color:black;"> Market close: </span>' + NSE['regularMarketPreviousClose']['fmt'] + '<br>' +
          '<span style="color:black;"> Percent change: </span>' + NSE['regularMarketChangePercent']['fmt'] + '<br>';

          document.getElementById('descriptionBSE').innerHTML = bseString;
          document.getElementById('descriptionNSE').innerHTML = nseString;
        },
        (err) => {
          console.log(err.message);
        }
    );
  }

}
