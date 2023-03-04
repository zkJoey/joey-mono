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

url = "http://35.225.197.208:9999/predict" # flock sandbox api prediction endpoint

class FlockSignals(models.HumaBaseModel):
    prediction: int

class FlockAdapter(adapter_models.SignalAdapterBase):
    name: ClassVar[str] = "flock_adapter"
    required_inputs: ClassVar[List[str]] = ["input_array"]
    signals: ClassVar[List[str]] = list(FlockSignals.__fields__.keys())
    
    async def fetch(self, input_array: dict, *args: Any, **kwargs: Any) -> FlockSignals:
        headers = {"accept": "application/json"}
        response = requests.post(url, headers=headers, json={"input_array": input_array})
        print(response)
        prediction = response.json()["prediction"]
        return FlockSignals(prediction=prediction)
    