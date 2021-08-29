import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  stock: string;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.stock = params['stock'];
    });
    this.displayData(this.stock);
  }

  displayData(stock: string) {
    const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=IN&language=en&symbol=' + stock;
    const headers = new HttpHeaders({'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    'x-rapidapi-key': '27a54e9ba6msh718b7fee6da4c49p1342bbjsn4b375822cb79', useQueryString: 'true'});

    this.httpClient.get(url, {headers}).subscribe(
        (data) => {
          const profile = '<h2>' + stock + '</h2><span style="color:black;"> Sector: </span>' + data['summaryProfile']['sector'] + '<br>' +
          '<span style="color:black;"> Country: </span>' + data['summaryProfile']['country'] + '<br>' +
          '<span style="color:black;"> Phone: </span>' + data['summaryProfile']['phone'] + '<br>' +
          '<span style="color:black;"> Website: </span>' + data['summaryProfile']['website'] + '<br>' +
          '<span style="color:black;"> Employee count: </span>' + data['summaryProfile']['fullTimeEmployees'];

          const price = '<h2>Price</h2><span style="color:black;"> Market Price: </span>' +
          data['price']['regularMarketPrice']['fmt'] + '<br>' +
          '<span style="color:black;"> Market Open: </span>' + data['price']['regularMarketOpen']['fmt'] + '<br>' +
          '<span style="color:black;"> Market Day High: </span>' + data['price']['regularMarketDayHigh']['fmt'] + '<br>' +
          '<span style="color:black;"> Market Day Low: </span>' + data['price']['regularMarketDayLow']['fmt'] + '<br>' +
          '<span style="color:black;"> Market Previous Close: </span>' + data['price']['regularMarketPreviousClose']['fmt'];

          const finance = '<h2>Financial Data</h2><span style="color:black;"> Profit Margin: </span>' +
          data['financialData']['profitMargins']['fmt'] + '<br>' +
          '<span style="color:black;"> Revenue Growth: </span>' + data['financialData']['revenueGrowth']['fmt'] + '<br>' +
          '<span style="color:black;"> Gross Profit: </span>' + data['financialData']['grossProfits']['fmt'] + '<br>' +
          '<span style="color:black;"> Current price: </span>' + data['financialData']['currentPrice']['fmt'];

          document.getElementById('profile').innerHTML = profile;
          document.getElementById('price').innerHTML = price;
          document.getElementById('finance').innerHTML = finance;
        },
        (err) => {
          console.log(err.message);
        }
    );

    const newsUrl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?region=US&category=' + stock;
    this.httpClient.get(newsUrl, {headers}).subscribe(
      (data) => {
        const news = data['items']['result']['0']['title'] + '<br>' + data['items']['result']['0']['link'] + '<br><br>' +
        data['items']['result']['1']['title'] + '<br>' + data['items']['result']['1']['link'] + '<br><br>' +
        data['items']['result']['2']['title'] + '<br>' + data['items']['result']['2']['link'] + '<br><br>' +
        data['items']['result']['4']['title'] + '<br>' + data['items']['result']['4']['link'] + '<br><br>' +
        data['items']['result']['3']['title'] + '<br>' + data['items']['result']['3']['link'];
        document.getElementById('stockNews').innerHTML = news;
      },
      (err) => {
        console.log(err.message);
      }
  );

  }

}
