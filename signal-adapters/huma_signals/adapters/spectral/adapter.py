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

url = "https://api.spectral.finance"

class SpectralSignals(models.HumaBaseModel):
    score: str

class SpectralAdapter(adapter_models.SignalAdapterBase):
    name: ClassVar[str] = "spectral_adapter"
    required_inputs: ClassVar[List[str]] = ["wallet", "token"]
    signals: ClassVar[List[str]] = list(SpectralSignals.__fields__.keys())
    
    async def fetch(self, wallet: str, token: str, *args: Any, **kwargs: Any) -> SpectralSignals:
        headers = {"accept": "application/json", "Authorization": "Bearer " + token}
        endpoint = "/api/v1/addresses/" + wallet
        response = requests.get(url + endpoint, headers=headers)
        score = response.json()["score"]
        return SpectralSignals(score=score)
    