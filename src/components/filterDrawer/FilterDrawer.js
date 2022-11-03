import {
  Modal,
  Select,
  Stack,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { Toast } from "@shopify/polaris";
import { Button, Drawer } from "antd";
import React, { useCallback, useState } from "react";

function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const toggleActive = useCallback(
    () => setActiveToast((activeToast) => !activeToast),
    []
  );
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const [syncDataResult, setSyncDataResult] = useState();
  const activator = <Button onClick={handleChange}>Sync Status</Button>;
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchSync = () => {
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/matchProduct`,
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
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg",
        },
      }
    )
      .then((response) => response.json())
      .then((syncData) => setSyncDataResult(syncData));
    handleChange();
  };
  const toastMarkup = activeToast ? (
    <Toast content={syncDataResult.message} onDismiss={toggleActive} />
  ) : null;
  return (
    <div>
      <Stack>
        <TextField placeholder="Search with title vendor or product" />
        <Button onClick={showDrawer}>More Filters</Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        {activator}
        <Button>Amazon Lookup</Button>
        <Select></Select>
      </Stack>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: "Proceed",
          onAction: fetchSync,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              It will search sku(s) in your Amazon’s seller panel. For all the
              products with matching sku(s), status of main products will shown
              under Amazon Status and variant’s status will reflect on Edit
              Product page. Do you want to proceed with matching all the
              product(s) from Amazon to that on app ?
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
      {toastMarkup}
    </div>
  );
}

export default FilterDrawer;
