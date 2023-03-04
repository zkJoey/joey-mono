from typing import Any, Dict, List
import requests
import config

def fetch_signal(signal_names: List[str], adapter_inputs: Dict[str, Any]) -> Dict[str, Any]:
   """Fetch signals from the decentralized signal portfolio service.
   
   For more details about DSP service, see https://github.com/00labs/huma-signals/tree/main/huma_signals
   """
   request = {"signal_names": signal_names, "adapter_inputs": adapter_inputs}
   response = requests.post(config.signals_endpoint, json=request)
   if response.status_code != 200:
       raise ValueError(f"Error fetching signals: {response.text}")
   return {k: v for k, v in response.json().get("signals").items() if k in signal_names}


def underwrite(huma_pool, **kwargs):
    """
    The interface function between an EA and Huma EA service
    :param huma_pool: the object that represents huma pool contract
    :param **kwargs
        poolAddress:        str: the address for the destiny huma pool
        borrowerWalletAddress:      str: the borrower's wallet address
    :return: returns corresponding fields to UI
    """
    print("underwrite")
    print("kwargs: ", kwargs)

    # stripe_api_key = kwargs["stripe_api_key"]  # noqa
    # account = kwargs["account"]  # noqa
    # wallet = kwargs["wallet"]  # noqa
    # token = kwargs["token"]  # noqa

    stripe_api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"  # noqa
    account = "circle_account_x234k12"  # noqa
    wallet = "0x573d19B66Cdc33f7E751f2a478ECeCe95155e798"  # noqa
    token = "SFMyNTY.g2gDbQAAACQ3MGY1ZDgxMC0yMjk1LTQyMjQtODA1Zi01ZGNmNzMxYzY3YTBuBgBspGeWhgFiAAFRgA.ruwaqqurFh6PCDUhY0z0TNmiWiqrmp8ZOmG3--bksSM"  # noqa
    
    # your code here
    
    stripe_signal_names = ["stripe_adapter.total_balance"]
    circle_signal_names = ["circle_adapter.account_balance"]
    spectral_signal_names = ["spectral_adapter.score"]
    flock_signal_names = ["flock_adapter.prediction"]

    stripe_adapter_input = {"stripe_api_key": stripe_api_key}
    circle_adapter_input = {"account": account}
    spectral_adapter_input = {"wallet": wallet, "token": token}
    flock_adapter_input = {"input_array": [
        12000.0,
        36,
        10.78,
        98000.0,
        24.04,
        0.0,
        694.0,
        0.0,
        15.0,
        1.0,
        20462.0,
        62.8,
        39.0,
        1349.67,
        0.0,
        0.0,
        7884.96,
        754.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0
    ]}

    credit_limit = 0
    intervalInDays = 0
    remainingPeriods = 0
    aprInBps = 40

    print("getting signals")
    stripe_signals = fetch_signal(stripe_signal_names, stripe_adapter_input)
    stripe_total_balance = stripe_signals.get(stripe_signal_names[0])
    print("stripe_total_balance: ", stripe_total_balance)
    if stripe_total_balance > 0:
        credit_limit += 100
        intervalInDays += 10
        remainingPeriods += 3
        aprInBps -= 10
    else:
        raise Exception("accountTooNew")
    
    
    circle_signals = fetch_signal(circle_signal_names, circle_adapter_input)
    circle_balance = circle_signals.get(circle_signal_names[0])
    print("circle_balance: ", circle_balance)
    if circle_balance > 0:
        credit_limit += 100
        intervalInDays += 10
        remainingPeriods += 3
        aprInBps -= 10
    else:
        raise Exception("accountTooNew")
    
    
    spectral_signals = fetch_signal(spectral_signal_names, spectral_adapter_input)
    spectral_score = float(spectral_signals.get(spectral_signal_names[0]))
    print("spectral_score: ", spectral_score)
    if spectral_score > 200.0:
        credit_limit += 100
        intervalInDays += 10
        remainingPeriods += 3
        aprInBps -= 10
    else:
        print("spectral_score too low")
        raise Exception("accountTooNew")
    
    flock_signals = fetch_signal(flock_signal_names, flock_adapter_input)
    flock_prediction = float(flock_signals.get(flock_signal_names[0]))
    print("flock_prediction: ", flock_prediction)
    if flock_prediction == 0:
        credit_limit += 100
        intervalInDays += 10
        remainingPeriods += 3
        aprInBps -= 10
    else:
        print("flock_prediction too low")
        raise Exception("accountTooNew")
    print("finished checks")
    
    
    result = {
        "creditLimit": 10000*10**6,
        "intervalInDays": intervalInDays,
        "remainingPeriods": remainingPeriods,
        "aprInBps": aprInBps
    }
    result = {
        "creditLimit": int(credit_limit*10**6),
        "intervalInDays": 30,
        "remainingPeriods": 12,
        "aprInBps": 0
    }
    print("result", result)
    
    return result  # noqa
