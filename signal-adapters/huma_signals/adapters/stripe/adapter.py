import datetime
from typing import Any, ClassVar, List

# import httpx
# import pandas as pd
# import pydantic
import structlog
import stripe
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

from huma_signals import models
from huma_signals.adapters import models as adapter_models
from huma_signals.settings import settings

logger = structlog.get_logger()

class StripeSignals(models.HumaBaseModel):
    total_balance: int

class StripeAdapter(adapter_models.SignalAdapterBase):
    name: ClassVar[str] = "stripe_adapter"
    required_inputs: ClassVar[List[str]] = ["stripe_api_key"]
    signals: ClassVar[List[str]] = list(StripeSignals.__fields__.keys())
    
    async def fetch(self, stripe_api_key: str, *args: Any, **kwargs: Any) -> StripeSignals:
        balance = stripe.Balance.retrieve()

        return StripeSignals(total_balance=balance.available[0].amount)
    