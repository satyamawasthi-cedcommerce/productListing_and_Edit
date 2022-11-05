import { Badge, Card, Icon, Tabs } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
// import { ArrowLeftMinor } from "@shopify/polaris-icons";
import classes from "./Listing.modul.css";
import useFetch from "../../fetch";
import { Button, Image, Table } from "antd";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import BannerProducts from "../banner/BannerProducts";
import FilterDrawer from "../filterDrawer/FilterDrawer";
import TopContent from "../topContent/TopContent";
import { childColumns, columns } from "../../tableColumns";

function Listing() {
  // State variable to store the whole object
  const [productsData, setProductsData] = useState();
  // state variable to store the required fields
  const [productDataDisplay, setProductDataDisplay] = useState([]);
  const { extractDataFromApi } = useFetch();
  const [load, setLoad] = useState(false);
  var [statusDataCount, setStatusDataCount] = useState({
    notListed: 0,
    inactive: 0,
    incomplete: 0,
    active: 0,
  });
  const fetchFun = () => {
    // following variables hold the info to be passed
    var url =
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?count=50";
    setLoad(true);
    // temporary varible to hold data
    var temp = extractDataFromApi(url);
    temp.then((data) => {
      setLoad(false);
      setProductsData({ ...data });
      // variable to hold data
      var storeData = [];
      data.data.rows.forEach((item, index) => {
        // variables to store data for product_details
        var childData = [];
        var parentContainer_id = item.source_product_id;
        var parentProductDetails = <></>;
        var childDetails = item.items;
        var inventoryQuantity = 0;
        // condition
        if (item.type === "variation") {
          item.items.forEach((childItem, childIndex) => {
            var barCode = childItem.barcode;
            var asinCode = childItem.asin;
            if (parentContainer_id !== childItem.source_product_id) {
              inventoryQuantity += childItem.quantity;

              childData.push({
                image: (
                  <Image
                    src={childItem.main_image}
                    width={90}
                    height={90}
                    alt={childItem.title}
                  />
                ),
                title: childItem.title,
                productDetails: (
                  <>
                    <p>
                      <b>Price:</b> ${childItem.price}
                    </p>
                    <p>
                      {" "}
                      <b>SKU:</b> {childItem.sku}
                    </p>
                    {barCode ? (
                      <p>
                        {" "}
                        <b>Barcode:</b> {childItem.barcode}
                      </p>
                    ) : (
                      <p>
                        {" "}
                        <b>Barcode:</b> N/A
                      </p>
                    )}
                    {asinCode ? (
                      <p>
                        <b>ASIN:</b> {childItem.asin}
                      </p>
                    ) : (
                      <p>
                        <b>ASIN:</b> N/A
                      </p>
                    )}
                  </>
                ),
                template: "N/A",
                inventory: childItem.quantity,
              });
            } else {
              parentProductDetails = (
                <>
                  <p>
                    <b>SKU:</b> {childDetails[childIndex].sku}
                  </p>
                  {asinCode ? (
                    <p>
                      <b> ASIN:</b>
                      {childDetails[childIndex].asin}
                    </p>
                  ) : (
                    <>
                      <p>
                        {" "}
                        <b>ASIN:</b> N/A
                      </p>
                    </>
                  )}
                </>
              );
            }
          });
        } else {
          childDetails.forEach((parentItemDetails, parentItemIndex) => {
            if (parentContainer_id === parentItemDetails.source_product_id) {
              parentProductDetails = (
                <>
                  <p>
                    <b>Price:</b> ${parentItemDetails.price}
                  </p>
                  <p>
                    <b>SKU: </b>
                    {parentItemDetails.sku}
                  </p>
                  {parentItemDetails.asin ? (
                    <p>
                      <b>ASIN:</b> {parentItemDetails.asin}
                    </p>
                  ) : (
                    <p>
                      <b>ASIN:</b> N/A
                    </p>
                  )}
                  {parentItemDetails.barCode ? (
                    <p>
                      <b>Barcode: </b>
                      {parentItemDetails.barcode}
                    </p>
                  ) : (
                    <p>
                      <b>Barcode:</b>N/A
                    </p>
                  )}
                </>
              );
            }
          });
        }
        storeData.push({
          key: index,
          image: <Image src={item.main_image} width={90} alt={item.title} />,
          title: item.title,
          productDetails: parentProductDetails,
          template: "N/A",
          inventory: <p>{inventoryQuantity} in stock</p>,
          actions: (
            <Button>
              <Icon source={MobileVerticalDotsMajor} color="base" />
            </Button>
          ),
          activity: "--",
          description: [...childData],
        });
      });
      setProductDataDisplay([...storeData]);
    });
  };
  console.log(productDataDisplay);
  console.log(productsData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchFun(), []);
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  // Providing tab navigation
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
      content: (
        <span>
          Error 
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
  ];
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
      statusCountData.data.map((item,index) =>{
        if(item._id === "Inactive"){
          tempStatus.inactive = item.total
        }
        if(item._id === "Active"){
          tempStatus.active = item.total
        }
        if(item._id === null){
          tempStatus.notListed = item.total
        }
        if(item._id === "Incomplete"){
          tempStatus.incomplete = item.total
        }
      })
      setStatusDataCount({...tempStatus})
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchStatus(), []);

  return (
    <div>
      {" "}
      <div className={classes.gridContainer}>
        <div className={classes.topContent}>
          <div>
            <TopContent />
            <BannerProducts />
          </div>
        </div>
        <br />
        <Card>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            fitted
          >
            <div className={classes.searchFilterContainers}>
              <FilterDrawer />
            </div>
            <Card.Section title={tabs[selected].content}>
              <Table
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <Table
                      bordered
                      columns={childColumns}
                      dataSource={record.description}
                      pagination={false}
                    />
                  ),
                  rowExpandable: (record) => record.description.length > 0,
                }}
                columns={columns}
                rowSelection={{}}
                dataSource={productDataDisplay}
                loading={load}
              />
            </Card.Section>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default Listing;
