from flask import Flask,request
import requests

def send_sms(name,phone):

    url = "https://www.fast2sms.com/dev/bulk"

    payload = "sender_id=FSTSMS&message=Harvesting has started nearby!!!?&language=english&route=p&numbers="+phone

    headers = {
    'authorization': "q6fAdIhu1L8EzCoRs2ywjKFB34cMTZntlmVJY5D9PxXUvSQNkiSl3GdnCsjZDocfuW0VN5aiKq64J97E",
    'Content-Type': "application/x-www-form-urlencoded",
    'Cache-Control': "no-cache",
    }

    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)

app = Flask(__name__)

@app.route('/sms',methods=['POST'])
def index():
    data = request.get_json()
    name = data['name']
    phone = data['phone']
    send_sms(name,phone)
    print(name,phone)
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)