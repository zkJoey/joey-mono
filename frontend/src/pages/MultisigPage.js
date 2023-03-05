import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

const MultisigPage = () => {
    return (
        <Container>
            <h1 className="text-2xl font-bold">MultisigPage</h1>
            <div className="flex flex-col">
                <div className="flex flex-row space-x-2 mb-10">
                    <div className="text-lg font-medium text-gray-700">Owner1</div>
                    <div className="text-lg font-medium text-gray-700">Transaction already signed</div>
                </div>

                <div className="flex flex-row space-x-2 mb-10">
                    <div className="text-lg font-medium text-gray-700">Owner1</div>
                    <div className="text-lg font-medium text-gray-700 mx-auto my-auto w-max bg-red-900"><Button>Sign Transaction</Button></div>
                </div>

            </div>
        </Container>
    )
}

export default MultisigPage;