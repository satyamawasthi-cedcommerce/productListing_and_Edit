import { Button, Frame, Modal, Page, TextContainer, Toast } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'

function Lookup() {
    // const [lookupActive, setLookupActive] = useState(false);
    const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const [lookupResult, setLookupResult] = useState();
    const [activeToast, setActiveToast] = useState(false);
    const toggleActive = useCallback(
        () => setActiveToast((activeToast) => !activeToast),
        []
    );
    const toastMarkup = activeToast ? (
        <Toast content={lookupResult} onDismiss={toggleActive} />
    ) : null;
    const fetchLookup = () => {
        fetch(
            `https://multi-account.sellernext.com/home/public/connector/product/searchProduct`,
            {
                method: "POST",
                body: JSON.stringify({
                    target: {
                        marketplace: "amazon",
                        shopId: "479",
                    },
                    source: {
                        marketplace: "shopify",
                        shopId: "476",
                    },
                }),
                headers: {
                    "Ced-Source-Id": 476,
                    "Ced-Source-Name": "shopify",
                    "Ced-Target-Id": 479,
                    "Ced-Target-Name": "amazon",
                    "Content-type": "application/json",
                    appCode:
                        "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
                    appTag: "amazon_sales_channel",
                    Authorization:
                        "Bearer   eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg",
                },
            }
        )
            .then((response) => response.json())
            .then((lookupData) => {
                console.log(lookupData.message);
                setLookupResult(lookupData.message)
            })
            .finally(() => { });
        handleChange();
        toggleActive();
    };
    return (
        <div>
            <Button onClick={() => setActive(!active)}>
                Amazon Lookup
            </Button>
            <Modal
                open={active}
                onClose={handleChange}
                title="Reach more shoppers with Instagram product tags"
                primaryAction={{
                    content: "Proceed",
                    onAction: fetchLookup,
                }}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                            You can choose to run Amazon Lookup for any number of products
                            you want. This will update the status of those products that
                            are currently under “Not Listed: Offer” status.
                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <div style={{ height: "2px" }}>
                <Frame>
                    <Page>{toastMarkup}</Page>
                </Frame>
            </div>
        </div>
    )
}

export default Lookup