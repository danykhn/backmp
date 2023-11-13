import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { Customer, MercadoPagoConfig, Payment, PreApproval, PreApprovalPlan }  from 'mercadopago';
import { MP_ACCES_TOKEN  } from 'src/data/mpkey';
import { mpFormData, planMp } from 'src/interfaces/mp.interface';


@Controller('mercadopago')

export class MercadoPagoController{

 //documentacion https://github.com/mercadopago/sdk-nodejs/tree/master/src/examples

 @Post('payment')
 async payment(){
console.log(MP_ACCES_TOKEN)
const client = new MercadoPagoConfig({ accessToken: MP_ACCES_TOKEN, options: { timeout: 5000, idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb' } });

//#region crear contacto
// const customerClient = new Customer(client);

// const body = {
// 	email: 'test_user_67446956@testuser.com',
// 	first_name: 'Jhon',
// 	last_name: 'Doe',
// 	phone: {
// 		area_code: '55',
// 		number: '991234567'
// 	},
// 	identification: {
// 		type: 'CPF',
// 		number: '12345678900'
// 	},
// 	default_address: 'Home',
// 	address: {
// 		id: '123123',
// 		zip_code: '4400',
// 		street_name: 'Rua Exemplo',
// 		street_number: 123,
// 		city: {
//          name:' Ciudad Autónoma de Buenos Aires'
//       }
// 	},
// 	date_registered: '2021-10-20T11:37:30.000-04:00',
// 	description: 'Description del user',
// 	default_card: 'None'
// };

// const resp = await customerClient.create({ body })
//     .then((result) => { console.log(result); })
//     .catch((error) => { console.error(error); });
 //#endregion crear contacto

 //#region Crear Plan + fsuscribir (init_point)

 const preApprovalPlanGet = new PreApprovalPlan(client);

 const respGet = preApprovalPlanGet.search({ options: {
	status: 'active'
} }).then(console.log).catch(console.log);



return respGet
 //#endregion Crear Plan + fsuscribir (init_point)
 }

 @Post('suscribirMercadoPago')
 async suscribirMercadoPago(@Body() data:mpFormData){
console.log(data)
	const client = new MercadoPagoConfig({ accessToken: MP_ACCES_TOKEN, options: { timeout: 5000, idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb' } });
	const preApproval = new PreApproval(client);

const res = await preApproval.create({ body: {	
		preapproval_plan_id:data.preapproval_plan_id,
		payer_email: data.payer.email,
		card_token_id: data.token,
		reason:'232',
		auto_recurring: {
			frequency: 12,
			frequency_type: 'months',
			transaction_amount: 12.34,
			currency_id: 'ARS',
		},
		back_url: 'http://localhost:9000/familiarGroups',
		status:'authorized'
	} }).then((r)=>{
		return r
	}).catch(console.log);	

	return res
 }

 @Post('crearPlanMercadoPago')
 async crearPlanMercadoPago(@Body() data: planMp){

	const client = new MercadoPagoConfig({ accessToken: MP_ACCES_TOKEN, options: { timeout: 5000, idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb' } });

	const preApprovalPlan = new PreApprovalPlan(client);
	let datas = {}
	const resp = await preApprovalPlan.create({ body: {
		 back_url: 'https://app.miclinicamedica.com.ar/',
		 reason: data.name,
		 auto_recurring:	{
			 currency_id: 'ARS',
			 transaction_amount: data.price,
			 frequency: 1,
			 frequency_type: 'months',
		 }
	 } }).then((r)=>{
		return datas = r
	 }).catch(console.log);

	 return resp
 }

@Get('getPlansMercadoPago')
 async planesnMercadoPago(){
	//Conexion
	const client = new MercadoPagoConfig({ accessToken: MP_ACCES_TOKEN, options: { timeout: 5000, idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb' } });
	//Entidad
	const preApprovalPlanGet = new PreApprovalPlan(client);

	//Consulta
	let result = {}
	const respGet = preApprovalPlanGet.search({ options: {
	   status: 'active'
   } }).then((r)=>{
	return result = r.results
   }).catch(console.log);
   
   return respGet
 }

 @Put('editPlansMercadoPago')
 async editarPlanMercadoPago(){
	//Conexion
	const client = new MercadoPagoConfig({ accessToken: MP_ACCES_TOKEN, options: { timeout: 5000, idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb' } });
	//Entidad
	const preApprovalPlanGet = new PreApprovalPlan(client);

	//Consulta
	const respEdit = preApprovalPlanGet.update({
		id: '<ID>',
		updatePreApprovalPlanRequest: {
			back_url: '<BACK_URL>',
			reason: '<REASON>',
			auto_recurring:	{
				currency_id: '<CURRENCY_ID>',
				transaction_amount: 12.34,
				frequency: 1,
				frequency_type: '<FREQUENCY_TYPE>',
			},
		}
	}).then(console.log).catch(console.log);
   
   return respEdit
 }

 @Post('crearClienteMercadoPago')
 async crearCliente(){
	const client = new MercadoPagoConfig({ accessToken: MP_ACCES_TOKEN, options: { timeout: 5000, idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb' } });
	const customerClient = new Customer(client);

	const body = {
		email: 'test_user_67446956@testuser.com',
		first_name: 'Jhon',
		last_name: 'Doe',
		phone: {
			area_code: '55',
			number: '991234567'
		},
		identification: {
			type: 'CPF',
			number: '12345678900'
		},
		default_address: 'Home',
		address: {
			id: '123123',
			zip_code: '4400',
			street_name: 'Rua Exemplo',
			street_number: 123,
			city: {
			name:' Ciudad Autónoma de Buenos Aires'
		}
		},
		date_registered: '2021-10-20T11:37:30.000-04:00',
		description: 'Description del user',
		default_card: 'None'
	};

	const resp = await customerClient.create({ body })
		.then((result) => { console.log(result); })
		.catch((error) => { console.error(error); });

		return resp
	}


}


