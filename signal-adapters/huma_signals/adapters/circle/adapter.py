import datetime
import os
from typing import Any, ClassVar, List

# import httpx
# import pandas as pd
# import pydantic
import structlog 
import requests

from huma_signals import models
from huma_signals.adapters import models as adapter_models
from huma_signals.settings import settings

logger = structlog.get_logger()

url = "https://api-sandbox.circle.com/v1/businessAccount/balances"
api_key = os.getenv("circle_api_key")

class CircleSignals(models.HumaBaseModel):
    account_balance: int

class CircleAdapter(adapter_models.SignalAdapterBase):
    name: ClassVar[str] = "circle_adapter"
    required_inputs: ClassVar[List[str]] = ["account"]
    signals: ClassVar[List[str]] = list(CircleSignals.__fields__.keys())
    
    async def fetch(self, *args: Any, **kwargs: Any) -> CircleSignals:
        headers = {"accept": "application/json", "Authorization": 'Bearer {}'.format(api_key)}
        response = requests.get(url, headers=headers)
        print("response: ", response.json())
        # amount = response.json()["data"]["available"]
        amount = 881234 # create mock balance response
        return CircleSignals(account_balance=amount)
    