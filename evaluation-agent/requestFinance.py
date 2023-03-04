import requests

requestID = "01ad6f0aafdef1b3762adaabe96e8b4290163359fa5b871a7d0656e982747e7ca9"

url = "https://api.request.finance/invoices/{}".format(requestID)
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "9N0FGQA-V0B43V3-QA1BVSD-K6QPRVV"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)  # Print the JSON response data
else:
    print("Error:", response.status_code, response.text)