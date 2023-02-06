import request from "../config/common";
import { expect } from "chai";


console.log('starting code ......................')

//here we have all tcs
describe('Transaction',() =>{
    
    var po_id=0;

    console.log('first test case excution start.....................')

    //Task 1: Test the /transaction `POST` route
    it('POST/transaction',async () =>{

        const data ={
            "coin1": "INR",
            "coin2": "USDT",
            "coin1Amount": 332,
            "coin2Amount": 4
        };

        const rem = await request
        .post('/transaction')
        .set('Accept', 'application/json')
        .set( 'Content-Type','application/json')
        .send(data)
        .then((rem)=>{
              
              
              console.log('printing data which we have inserted ............by post route')
              console.log(rem.body);  

              po_id =rem.body.id;   //assign id value to po_id variable
              console.log(po_id)    //optional to validate getting id
              
              console.log('validating data inserted.............')
              expect(rem.body).to.not.be.empty;
              

              
              console.log('validating inserted data as same as we wanted ..............')

              expect(rem.body.sentCoin).to.eq(data.coin1);
              expect(rem.body.receivedCoin).to.eq(data.coin2);
              expect(rem.body.sentCoinAmount).to.eq(data.coin1Amount);
              expect(rem.body.receivedCoinAmount).to.eq(data.coin2Amount);
              
              
              console.log('validation 1st tc is successful.................')
               });
            });
            //Task 2: Test the /transaction `GET` route
            console.log('stating of 2nd test case.......................')
    it( 'GET/transaction/:id', async () =>{
                const url = '/transaction/'+po_id
                
                console.log('validating 1st id value is passing to second.........')
                console.log(po_id); 
                    
                const res = await request.get(url).then((res) => {

                  
                   console.log('printing the data ............................by get method')
                   console.log(res.body)
                    
                   
                   console.log('sentCoinAmount divided by receivedCoinAmount.....................')

                   let SEND_COIN_AMOUNT=res.body.sentCoinAmount
                   let RECIEVE_COIN_AMOUNT=res.body.receivedCoinAmount
                   let FINAL_result= SEND_COIN_AMOUNT / RECIEVE_COIN_AMOUNT

                   console.log('printing the result ............')
                   console.log(FINAL_result);
                   
                   
                   console.log('validating receivedCoinMarketPrice is equal to sentCoinAmount divided by receivedCoinAmount ...')

                   expect(res.body.receivedCoinMarketPrice).to.be.eq(FINAL_result)

                   console.log('validating get id is equal to post id are equal ...........')
                   expect(res.body.id).to.be.eq(po_id);
                   console.log(res.body.id);
                   console.log('excution is comleted ..................................')
                   
            });
        })        

        });