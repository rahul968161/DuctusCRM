

          import Logo from "../../Images/Logo.png";
          import axios from "axios";
          
          
          function printElm({ Details, state, isView = 0 }) {
          
            if(isView == 1){
            var win = window.open();
            }
            let Total = 0;
            state.dataSource?.map((item) => (Total += Number(item.Amount)));
            let Percentage = Number(Total) / 100;
            let IGST = Number(Percentage) * 18;
            let CGST = Number(Percentage) * 9;
          
          
            var a = [
              "",
              "one ",
              "two ",
              "three ",
              "four ",
              "five ",
              "six ",
              "seven ",
              "eight ",
              "nine ",
              "ten ",
              "eleven ",
              "twelve ",
              "thirteen ",
              "fourteen ",
              "fifteen ",
              "sixteen ",
              "seventeen ",
              "eighteen ",
              "nineteen ",
            ];
            var b = [
              "",
              "",
              "twenty",
              "thirty",
              "forty",
              "fifty",
              "sixty",
              "seventy",
              "eighty",
              "ninety",
            ];
          
            function inWords(num) {
          
          
          
          
              if ((num = num.toString()).length > 9) return "overflow";
              let n = ("000000000" + num)
                .substr(-9)
                .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
              if (!n) return;
              var str = "";
              str +=
                n[1] != 0
                  ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
                  : "";
              str +=
                n[2] != 0
                  ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
                  : "";
              str +=
                n[3] != 0
                  ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
                  : "";
              str +=
                n[4] != 0
                  ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
                  : "";
              str +=
                n[5] != 0
                  ? (str != "" ? "and " : "") +
                    (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
                    "only "
                  : "";
              return str;
            }
          
            let HTML = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            
            <body>
              <style type="text/css">
                .tg {
                  border-collapse: collapse;
                  border-spacing: 0;
                  width: 98vw;
                }
            
                .tg td {
                  border-color: black;
                  border-style: solid;
                  border-width: 1px;
                  font-family: Arial, sans-serif;
                  font-size: 13px;
                  overflow: hidden;
                  word-break: normal;
                  overflow: auto;
                  padding: 3px;
                }
            
                .tg th {
                  border-color: black;
                  border-style: solid;
                  border-width: 1px;
                  font-family: Arial, sans-serif;
                  font-size: 13px;
                  font-weight: normal;
                  overflow: hidden;
                  word-break: normal;
                  overflow: auto;
                  padding: 3px;
                  font-weight: 700;
                }
            
                .tg .tg-0pky {
                  border-color: inherit;
                  text-align: left;
                  vertical-align: top
                }
            
                .tg .tg-0lax {
                  text-align: left;
                  vertical-align: top
                }
                .tg .tg-0lay{
                  text-align:center;
                }
            
                p {
                  margin: 0px !important;
                  padding: 0px !important;
                }

                table.terms th, table.terms td {
                  font-size: 12px;
                }
                .warranty{ font-size:11px !important; }

              </style>
              <table class="tg">
                <thead>
                  <tr>
                    <th class="tg-0pky" style="border-bottom: 0px;">
                      <img src=${Logo} style="width: 150px;height: 70px;" />
                    </th>
                    <th class="tg-0pky" colspan="3" style="width: 40%">
                      Ductus Technologies Private Limited
                      382, Pace City II, Sector 37,
                      Gurugram, Haryana 122001
                    </th>
                    <th class="tg-0pky">
                      <h2 style="color: #2f5496; text-align: center;">
                        Purchase Order
                      </h2>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="tg-0pky" style="border-top: 0px;">GSTN : 06AADCI6061R2Z2 </th>
                    <th class="tg-0pky" colspan="3">PAN : AADCI6061R</th>
                    <th class="tg-0pky" >CIN : U72900HR2014PTC053000</th>
                  </tr>
                  <tr>
                    <td class="tg-0pky" style=" vertical-align: middle !important;">
                      <h3>Supplier Details</h3>
                    </td>
                    <td class="tg-0pky" colspan="3">
                      <h3>${Details.Company_Name}</h3>
                      <p>${Details.Address}</p>
                      <p>${Details.Dist}</p>
                      <p>${Details.State} </p>
                      <p><h3>GST</h3> ${Details.GST}</p>
                    </td>
                    <td rowspan="1">
                      <table style="width: 100%;">
                        <tr>
                          <td style="border: none">PO No.</td>
                          <td style="border: none">${Details.PO_NO}</td>
                        </tr>
                        <tr>
                          <td style="border: none">PO Date</td>
                          <td style="border: none">${Details.PO_DATE}</td>
                        </tr>
                        <tr>
                          <td style="border: none">Delivery Date</td>
                          <td style="border: none">${Details.Delivery_Date}</td>
                        </tr>
                        <tr>
                          <td style="border: none">Suplier Email</td>
                          <td style="border: none">${Details.Supplier_Email}</td>
                        </tr>
                        <tr>
                          <td style="border: none">Suplier Contact</td>
                          <td style="border: none">${Details.Supplier_Contact}</td>
                        </tr>
                        
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" style=" vertical-align: middle !important;">
                      <h3>
                        Bill To Ship / Ship To Address
                      </h3>
                    </td>
                    <td class="tg-0pky" colspan="3">
                      <!-- <h3 style="margin: 5px 0;">${Details.Company_Name}</h3> -->
                      <h3>Ductus Technologies Private Limited</h3>
                      <p>  382, Pace City II, Sector 37,
                      Gurugram, Haryana 122001</p>
                    </td>
                    <th class="tg-0pky">
                      <table style="width: 100%;">
                        <tr>
                          <td style="border: none">User</td>
                          <td style="border: none">Shahnawaz Alam</td>
                        </tr>
                        <tr>
                          <td style="border: none">User Email</td>
                          <td style="border: none">admin@ductus.tech</td>
                        </tr>
                        <tr>
                          <td style="border: none">Payment Terms</td>
                          <td style="border: none">${Details.Payment_term}</td>
                        </tr>
                      </table>
                    </th>
                  </tr>
                  <tr>
                    <td class="tg-0pky" style="padding: 0px;">
                      <table style="width: 100%;padding: 0px;">
                        <tr>
                          <td style="border: none;border-right: 1px solid #000;">S#</td>
                          <td style="border: none;">Product Description</td>
                        </tr>
                      </table>
                      
                    </td>
                    
                    <td class="tg-0pky">HSN/SAC </td>
                    <td class="tg-0pky">Rate</td>
                    <td class="tg-0pky">QTY</td>
                    <td class="tg-0pky">Amount (INR)</td>
                  </tr>
              `;
          
            for (let index = 0; index < state.dataSource.length; index++) {
              let dat = state.dataSource?.[index];
              // console.log(state.dataSource, dat);
              HTML += `<tr key=${dat.key}>
                <td class="tg-0pky" style="padding: 0px;">
                  <table style="width: 100%;padding: 0px;">
                    <tr>
                      <td style="border: none;border-right: 1px solid #000;width: 17%;">${dat.key}</td>
                      <td style="border: none;">${dat.Description}</td>
                    </tr>
                  </table>
                   
                </td>
                
                <td class="tg-0pky">${dat.HSN_SAC}</td>
                <td class="tg-0pky">${dat.RATE}</td>
                <td class="tg-0pky">${dat.QTY}</td>
                <td class="tg-0pky">${dat.Amount}</td>  
              </tr>`;
            }
          
            HTML += `
                 <tr>
                   <td class="tg-0lax" colspan="3">
                      <br>
                      <span class="tg tg-0pky" style="width:100%; display:block; padding-bottom: 20px; font-weight: 700;">Amount in Word: ${inWords(Math.round(Total + IGST) )} Only</span>
                      <br>
          
                     This is a firm price order. Unless otherwise specified in writing by Ductus, price mentioned in this PO is
                     firm and no price variation on any account will be allowed. Price is subject to delivery of goods and services
                     to the satisfaction of Ductus, submission of correct invoices and due fulfillment of all obligations by Vendor
                     under the terms of the order, Ductus shall pay for the services as per milestones & pricing contained in the
                     payment terms.
                   </td>
                   <td class="tg-0lax" colspan="2" style="padding: 0;">
                     <table style="width: 100%;padding: 0px;row-gap: 0;">
                       <tr>
                         <th>TOTAL</th>
                         <td>${Total}</td>
                       </tr>
                       <tr>
                         <td>IGST @ 18% </td>
                         <td>${IGST}</td>
                       </tr>
                       <tr>
                         <td>CGST @ 9% </td>
                         <td></td>
                       </tr>
                       <tr>
                         <td>SGST @ 9% </td>
                         <td></td>
                       </tr>
                       <tr>
                         <th>TOTAL PO VALUE </th>
                         <td>${
                           Number(Total) + Number(IGST)
                         }</td>
                       </tr>
                       <tr>
                         <td>Other </td>
                         <td>-</td>
                       </tr>
                       <tr>
                         <th>Net Amount R/Off </th>
                         <td>${
                           Math.round(Number(Total) + Number(IGST))
                         }</td>
                       </tr>
                     </table>
                   </td>
                 </tr>
               </tbody>
               <th class="tg-0pky" colspan="5">
               </th>
               <tfoot>
              
                 <tr>
                   <td class="tg-0pky" colspan="5" style="padding: 10px 30px;">
                     <h3 style="margin: 5px 0;">Terms and Condition:</h3>
                     <table class="terms" style="width: 100%;padding: 0px;row-gap: 0;">
                       <tr>
                         <th style="border: none;">1. </th>
                         <td style="border: none;">For Processing on billing material acceptance required from the user </td>
                       </tr>
                       <tr>
                         <th style="border: none;">2. </th>
                         <td style="border: none;">Material not delivered as per Delivery Date, shall attract PO
                           Cancelletion/Material Rejection </td>
                       </tr>
                       <tr>
                         <th style="border: none;">3. </th>
                         <td style="border: none;">Original Invoice Copy to be delivered along with shipment, Soft copy may be sent
                           to user keeping accounts@ductus.tech in CC (Copy) </td>
                       </tr>
                       <tr>
                         <th style="border: none;">4. </th>
                         <td style="border: none;">Invoice shall be processed after applicable TDS deductions </td>
                       </tr>
                       <tr>
                         <th style="border: none;">5. </th>
                         <td style="border: none;">Acceptance of Purchase Order is must before supply of Goods/Services </td>
                       </tr>
                       <tr>
                         <th style="border: none;">6. </th>
                         <td style="border: none;">With Purchase Order acceptance, supplier confirms that necessary GST shall be
                           deposited on time </td>
                       </tr>
          
                     </table>
                   </td>
                 </tr>
                 <tr>
                   <td class="tg-0lax warranty" colspan="2" style="width: 50%;">
                     WARRANTY: By accepting this PO, Vendor warrants that the goods and services furnished will be free from
                     defects in materials and workmanship, merchantable and in full conformity with DUctus's specifications,
                     drawings, and data, and that such goods will be fit for the HCL's intended use, and that Vendor will convey
                     good title to the goods, free and clear from all liens, claims, and encumbrances. Upon Ductus's request,
                     Vendor shall furnish Ductus with a formal waiver or release of all liens by Ductus and/or Ductus's suppliers.
                   </td>
                   <td class="tg-0lax" colspan="3">
                     <p >For Ductus Technologies Private Limited</p><br><br><br><br>
                     <p class="tg-0lay">Authorised Signatory</p>
                   </td>
                 </tr>
                 <tr>
                   <td class="tg-0lax" colspan="5" style="text-align: center;">
                     This is a Computer Generated Purchase Order
                   </td>
                 </tr>
               </tfoot>
             </table>
             </body>
          
             </html>
          `;
            
            
            if(isView == 1){
                win.document.write(HTML);
                win.document.close();
                
                
                setTimeout(() => {
                  win.print();
                }, 700);
            } else {  
              return HTML;
            }
          
          }
          
          export default printElm;
          