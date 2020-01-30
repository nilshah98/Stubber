# PAYMENTS instruction

There are 3 routes on this service 
* GET /payments/details --> Get the details of payment methods and options
	Qyery Parameters:-
	1. amount? --> the amount of which the payment is to be paid.
	2. curreny? --> the currency in which amount is to be paid.
* GET /payments/account/:userid --> get account details of userid
* POST /payments/razorpay/webhook/rtgs__neft --> webhook for razorpay
* POST /payments/razorpay/directTransfer/:userid --> transfer amount userid account
	Body:-
	1. amount --> the amount of which the payment is to be paid.
* PUT /payments/razorpay/:userid --> to add razorpayLinkedAccount for a user
	Body:-
	1. razorpayLinkedAccount --> the string of the account number to be obtained from razorpay dashboard

# RAZORPAY Ref Links

* https://razorpay.com/docs/smart-collect/testing/ && https://razorpay.com/docs/smart-collect/dashboard/#make-a-test-payment --> to test
* https://razorpay.com/docs/smart-collect/notification/ --> for webhook data
* https://razorpay.com/docs/payment-gateway/web-integration/standard/ --> for standard checkout
* https://razorpay.com/docs/api/route/ --> For direct transfer to farmer's account