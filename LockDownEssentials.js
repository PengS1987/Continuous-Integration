const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    ITEM: Symbol("food"),
    UPSELL: Symbol("litter"),
    EXTRAS: Symbol("extras")
});

module.exports = class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sItemChoose = "";
        this.sUpsellItem = "";
        this.sExtras = "";
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Peng's Home Hardware Curbise.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                break;
            case OrderState.ITEM:
                this.stateCur = OrderState.UPSELL
                if (sInput.toLowerCase() == "broom") {
                    this.sItemChoose = "broom";
                } else if (sInput.toLowerCase() == "dustbin") {
                    this.sItemChoose = "dustbin";
                } else if (sInput.toLowerCase() == "showshovel") {
                    this.sItemChoose = "showShovel";
                } else if (sInput.toLowerCase() == "garbagecontainer") {
                    this.sItemChoose = "garbageContainer";
                } else if (sInput.toLowerCase() == "lightbulb") {
                    this.sItemChoose = "lightBulb";

                } else {
                    this.stateCur = OrderState.ITEM;
                    aReturn.push("Please enter broom, dustbin, showShovel, garbageContainer and lightBulb.");
                    break;
                }
                aReturn.push("Would you like a up-sell item such as GeekyHeadlamps, EarBuds or Scaler?");
                break;
            case OrderState.UPSELL:
                this.stateCur = OrderState.EXTRAS
                if (sInput.toLowerCase() == "geekyheadlamp") {
                    this.sUpsellItem = "GeekyHeadlamp";
                } else if (sInput.toLowerCase() == "earbud") {
                    this.sUpsellItem = "EarBud";
                } else if (sInput.toLowerCase() == "scaler") {
                    this.sUpsellItem = "Scaler";
                } else if (sInput.toLowerCase() == "no") {
                    this.sUpsellItem = sInput;
                }
                else {
                    this.stateCur = OrderState.UPSELL;
                    aReturn.push("Please enter GeekyHeadlamps,EarBud or Scaler.")
                    break;
                }
                // aReturn.push("Thank-you enter a random letter to continue!");
                // break;
            case OrderState.EXTRAS:

                aReturn.push("Your order list below:");
                this.nTotal = 0;
                this.nTax = 0;
                if (this.sItemChoose == "broom") {
                    aReturn.push("Brooms");
                    this.nTotal += 10;
                } else if (this.sItemChoose == "dustbin") {
                    aReturn.push("dustbin");
                    this.nTotal += 9;
                } else if (this.sItemChoose == "showshovel") {
                    aReturn.push("Show Shovel");
                    this.nTotal += 8;
                } else if (this.sItemChoose == "garbagecontainer") {
                    aReturn.push("Garbage Container");
                    this.nTotal += 7;
                } else if (this.sItemChoose == "lightBulb") {
                    aReturn.push("Light-bulb");
                    this.nTotal += 6;
                }


                if (this.sUpsellItem == "GeekyHeadlamps") {
                    aReturn.push("Geeky Headlamps");
                    this.nTotal += 5;
                } else if (this.sUpsellItem == "EarBud") {
                    aReturn.push("Ear Buds");
                    this.nTotal += 4;
                } else if (this.sUpsellItem == "Scaler") {
                    aReturn.push("Scaler");
                    this.nTotal += 3;
                }
                this.nTax = this.nTotal * 0.14;
                this.nTotal = this.nTotal + this.nTax;
                aReturn.push(`Your taxt is ${this.nTax.toFixed(2)}`)
                aReturn.push(`Your total comes to ${this.nTotal.toFixed(2)}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm() {
        // your client id should be kept private
        return (`<html>

      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c5 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 234pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c0 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 14pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c3 {
                  color: #000000;
                  font-weight: 700;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 14pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c9 {
                  color: #ce9178;
                  font-weight: 700;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 16pt;
                  font-family: "Courier New";
                  font-style: normal
              }
      
              .c6 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c8 {
                  border-spacing: 0;
                  border-collapse: collapse;
                  margin-right: auto
              }
      
              .c4 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  text-align: left
              }
      
              .c11 {
                  background-color: #ffffff;
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .c1 {
                  color: #494c4e;
                  font-size: 14pt
              }
      
              .c10 {
                  font-weight: 700
              }
      
              .c2 {
                  height: 0pt
              }
      
              .c12 {
                  font-size: 16pt
              }
      
              .c7 {
                  height: 11pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c11">
          <p class="c6"><span class="c10 c12">Welcome to Peng&rsquo;s Home Hardware Curbise.</span></p>
          <p class="c6 c7"><span class="c0"></span></p>
          <p class="c6"><span class="c3">Here are the main items we are offering</span></p>
          <p class="c6 c7"><span class="c0"></span></p>
          <p class="c6 c7"><span class="c0"></span></p><a id="t.14ffc070c5dd852e17457895e029c5f3a70a9fdc"></a><a id="t.0"></a>
          <table class="c8">
              <tbody>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">item</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">price</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c1">Brooms</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">10</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Dustbins</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">9</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Snow shovels</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">8</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Garbage container</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">7</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">Light-bulbs</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">6</span></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c6 c7"><span class="c0"></span></p>
          <p class="c6"><span class="c1 c10">Up-sell items</span></p>
          <p class="c6 c7"><span class="c0"></span></p><a id="t.a34a7ec6e552b61f59a0677088bdf507d7d7f400"></a><a id="t.1"></a>
          <table class="c8">
              <tbody>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">item</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">price</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c1">Geeky headlamps</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">5</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c1">Ear buds</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">4</span></p>
                      </td>
                  </tr>
                  <tr class="c2">
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c1">Scaler</span></p>
                      </td>
                      <td class="c5" colspan="1" rowspan="1">
                          <p class="c4"><span class="c0">3</span></p>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p class="c6 c7"><span class="c0"></span></p>
      </body>
      
      </html>

         `);

    }
}
