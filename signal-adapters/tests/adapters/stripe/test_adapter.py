import pytest

from huma_signals.adapters.stripe import adapter

print("describe_stripe_adapter")
def describe_stripe_adapter() -> None:
    print("describe_stripe_adapter")
    async def it_works_e2e(valid_address: str) -> None:
        result = await adapter.StripeAdapter().fetch(valid_address)
        assert result is not None
        assert result.total_balance > 0

    @pytest.fixture
    def it_validate_stripe_api_key() -> None:
        print("it_validate_stripe_api_key")
        with pytest.raises(ValueError):
            adapter.StripeAdapter(stripe_api_key="")

    def describe_fetch() -> None:
        print("describe_fetch")
        async def it_returns_stripe_signals(valid_address: str) -> None:
            result = await adapter.StripeAdapter().fetch(valid_address)
            assert result is not None
            assert result.total_balance == 0
        

            
