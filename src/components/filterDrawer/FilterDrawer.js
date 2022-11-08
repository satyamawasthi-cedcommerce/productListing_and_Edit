import {
  ActionList,
  Card,
  Columns,
  Filters,
  Frame,
  Icon,
  Modal,
  Page,
  Popover,
  RangeSlider,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { Toast } from "@shopify/polaris";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { CaretDownMinor } from "@shopify/polaris-icons";
import Search from "../search/Search";
function FilterDrawer() {
  const [active, setActive] = useState(false);
  const [lookupActive, setLookupActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const handleLookupChange = useCallback(
    () => setLookupActive(!lookupActive),
    [lookupActive]
  );
  const [syncDataResult, setSyncDataResult] = useState();

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
      .then((syncData) => {
        console.log(syncData.message);
        setSyncDataResult(syncData);
      })
      .finally(() => {});
    handleChange();
  };
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
      })
      .finally(() => {});
    handleLookupChange();
    toggleActive();
  };
  const [activeToast, setActiveToast] = useState(false);
  const toggleActive = useCallback(
    () => setActiveToast((activeToast) => !activeToast),
    []
  );
  const toastMarkup = activeToast ? (
    <Toast content={syncDataResult.message} onDismiss={toggleActive} />
  ) : null;
  const [accountStatus, setAccountStatus] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    []
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(null),
    []
  );
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (!isEmpty(moneySpent)) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  // popover code
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Bulk update <Icon source={CaretDownMinor} color="base" />
    </Button>
  );
  const hello = () => {
    alert("hello");
  };
  return (
    <>
      <Card sectioned>
        <Columns columns={{ xs: "2.5fr 0.5fr 1fr 1fr 1fr" }}>
          {/* <TextField placeholder="Search products" ></TextField> */}
          <Search />
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleFiltersClearAll}
            hideQueryField
          />
          <Button onClick={() => setActive(!active)}>Sync Status</Button>
          <Button onClick={() => setLookupActive(!lookupActive)}>
            Amazon Lookup
          </Button>
          <Popover
            active={popoverActive}
            activator={activator}
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
          >
            <ActionList
              actionRole="menuitem"
              items={[
                { content: "Import Products", onAction: hello },
                { content: "Export Products", onAction: hello },
              ]}
            />
          </Popover>
        </Columns>
        <Modal
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
                products with matching sku(s), status of main products will
                shown under Amazon Status and variant’s status will reflect on
                Edit Product page. Do you want to proceed with matching all the
                product(s) from Amazon to that on app ?
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
        <div style={{ height: "2px" }}>
          <Frame>
            <Page>{toastMarkup}</Page>
          </Frame>
        </div>
        <div>
          <Modal
            open={lookupActive}
            onClose={handleLookupChange}
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
        </div>
      </Card>
    </>
  );
}
function disambiguateLabel(key, value) {
  switch (key) {
    case "moneySpent":
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case "taggedWith":
      return `Tagged with ${value}`;
    case "accountStatus":
      return value.map((val) => `Customer ${val}`).join(", ");
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === "" || value == null;
  }
}
export default FilterDrawer;
