import { Badge, Card, Tabs } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../fetch";

function TabsComponent({ selected, setSelected }) {
  var [statusDataCount, setStatusDataCount] = useState({
    notListed: 0,
    inactive: 0,
    incomplete: 0,
    active: 0,
  });
  
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const tabs = [
    {
      id: "all-products",
      content: <span>All</span>,
      accessibilityLabel: "All Products",
      panelID: "all-customers-fitted-content-3",
    },
    {
      id: "Not-listed",
      content: (
        <span>
          Not Listed <Badge status="new">{statusDataCount.notListed}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Inactive",
      content: (
        <span>
          Inactive <Badge status="critical">{statusDataCount.inactive}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Incomplete",
      content: (
        <span>
          Incomplete<Badge status="warning">{statusDataCount.incomplete}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "active",
      content: (
        <span>
          Active <Badge status="success">{statusDataCount.active}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "error",
      content: <span>Error</span>,
      panelID: "accepts-marketing-fitted-content-3",
    },
  ];
  const { extractDataFromApi } = useFetch();
  const fetchStatus = () => {
    var url = `https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount`;
    var temp = extractDataFromApi(url);
    temp.then((statusCountData) => {
      console.log(statusCountData);
      var tempStatus = {
        notListed: 0,
        inactive: 0,
        incomplete: 0,
        active: 0,
      };
      // eslint-disable-next-line array-callback-return
      statusCountData.data.map((item, index) => {
        if (item._id === "Inactive") {
          tempStatus.inactive = item.total;
        }
        if (item._id === "Active") {
          tempStatus.active = item.total;
        }
        if (item._id === null) {
          tempStatus.notListed = item.total;
        }
        if (item._id === "Incomplete") {
          tempStatus.incomplete = item.total;
        }
      });
      setStatusDataCount({ ...tempStatus });
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchStatus(), []);
  return (
    <>
      <Card sectioned>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}
          fitted
        ></Tabs>
      </Card>
    </>
  );
}

export default TabsComponent;
