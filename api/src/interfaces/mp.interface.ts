export interface mpFormData {
    token: string,
    issuer_id: string,
    payment_method_id: string,
    transaction_amount: number,
    installments: number,
    description: string,
    payer: {
      email: string,
      identification: { 
        type: string,
        number: string
        }
    },
    preapproval_plan_id:string
    
}


export interface planMp {
    name: string,
    price: number,
    back_url: string,
    reason: string,
    auto_recurring:	{
        currency_id: string,
        transaction_amount: number,
        frequency: number,
        frequency_type: string,
    }
}
  