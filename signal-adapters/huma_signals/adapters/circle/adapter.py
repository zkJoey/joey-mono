import datetime
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

class CircleSignals(models.HumaBaseModel):
    account_balance: int

class CircleAdapter(adapter_models.SignalAdapterBase):
    name: ClassVar[str] = "circle_adapter"
    required_inputs: ClassVar[List[str]] = ["account"]
    signals: ClassVar[List[str]] = list(CircleSignals.__fields__.keys())
    
    async def fetch(self, *args: Any, **kwargs: Any) -> CircleSignals:
        headers = {"accept": "application/json"}
        response = requests.get(url, headers=headers)
        print(response.text)
        amount = 881234 # create mock account since Circle API keys are not distributed
        return CircleSignals(account_balance=amount)
    