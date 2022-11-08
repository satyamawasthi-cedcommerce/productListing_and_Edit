import { Button, Card, Icon, Image, Pagination, Badge } from "@shopify/polaris";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import useFetch from "../../fetch";
import { childColumns, columns } from "../../tableColumns";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import classes from "./ProductTable.module.css";
import { connect } from "react-redux";
import { containerSearch } from "../../redux/Action";
function ProductTable({ selected, setSelected, state }) {
  const [productDataDisplay, setProductDataDisplay] = useState([]);
  const [pagination, setPagination] = useState({
    next: null,
    prev: null,
  });
  const [load, setLoad] = useState(false);
  const [productsData, setProductsData] = useState();
  // this array is used to send the query parms to the url for tabChange
  const tabWiseUrl = [
    "",
    "&filter[cif_amazon_multi_inactive][1]={Not Listed}",
    "&filter[items.status][1]=Inactive",
    "&filter[items.status][1]=Incomplete",
    "&filter[items.status][1]=Active",
    "&filter[cif_amazon_multi_activity][1]=error",
  ];
  const { extractDataFromApi } = useFetch();
  const fetchFun = (data) => {
    setLoad(false);
    // following variables hold the info to be passed
    setPagination({
      next: data.data.next,
      prev: data.data.prev,
    });
    // variable to hold data
    var storeData = [];
    data.data.rows.forEach((item, index) => {
      // variables to store data for product_details
      var childData = [];
      var parentContainer_id = item.source_product_id;
      var parentProductDetails = <></>;
      var childDetails = item.items;
      var inventoryQuantity = 0;
      var amazonStatusrender = <Badge></Badge>;
      var childAmazonStatus = <Badge></Badge>;
      // condition
      if (item.type === "variation") {
        item.items.forEach((childItem, childIndex) => {
          var barCode = childItem.barcode;
          var asinCode = childItem.asin;
          if (parentContainer_id !== childItem.source_product_id) {
            inventoryQuantity += childItem.quantity;
            if (childItem["error"] !== undefined) {
              childAmazonStatus = (
                <p>
                  <Badge status="critical">Error</Badge>
                  <br />
                  <Button plain>View Error</Button>
                </p>
              );
            }
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
                    <b>SKU:</b> {childItem.sku}
                  </p>
                  {barCode ? (
                    <p>
                      <b>Barcode:</b> {childItem.barcode}
                    </p>
                  ) : (
                    <p>
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
              childAmazonStatus: childAmazonStatus,
            });
          } else {
            if (childItem["error"] !== undefined) {
              amazonStatusrender = (
                <p>
                  <Badge status="critical">Error</Badge>
                  <br />
                  <Button plain>View Error</Button>
                </p>
              );
            }

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
            if (parentItemDetails["error"] !== undefined) {
              amazonStatusrender = (
                <p>
                  <Badge status="critical">Error</Badge>
                  <br />
                  <Button plain>View Error</Button>
                </p>
              );
            } else if (parentItemDetails.status !== undefined) {
              amazonStatusrender = (
                <>
                  <Badge status="success">{parentItemDetails.status}</Badge>
                </>
              );
            } else {
              amazonStatusrender = (
                <>
                  <Badge>Not Listed</Badge>
                </>
              );
            }

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
        amazonStatus: amazonStatusrender,
        activity: "--",
        description: [...childData],
      });
    });
    setProductDataDisplay([...storeData]);
  };
  console.log(state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // following variables hold the info to be passed
    setLoad(true);
    // var searchId =
    console.log(state.conatinerId.id);
    var searchQuery = "";
    if (state.conatinerId.id !== undefined)
      searchQuery = `&filter[container_id][1]=${state.conatinerId.id}`;

    var url = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?${searchQuery}${tabWiseUrl[selected]}`;
    // temporary varible to hold data
    var temp = extractDataFromApi(url);
    temp.then((data) => {
      // console.log(data);
      setProductsData({ ...data });
      fetchFun(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, state.conatinerId]);
  // console.log(conatinerId);
  const fetchpage = (pageData) => {
    var url = "";
    if (pageData === "next")
      url = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?next=${pagination.next}&count=50`;
    else
      url = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?prev=${pagination.prev}&count=50`;
    setLoad(true);
    var tempPage = extractDataFromApi(url);
    tempPage.then((nextData) => {
      fetchFun(nextData);
      // console.log(nextData);
    });
  };
  return (
    <>
      <Card sectioned>
        <div>
          <Table
            bordered
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  bordered
                  columns={childColumns}
                  dataSource={record.description}
                  pagination={false}
                  rowSelection={{}}
                />
              ),
              rowExpandable: (record) => record.description.length > 0,
            }}
            columns={columns}
            rowSelection={{}}
            dataSource={productDataDisplay}
            loading={load}
          />
        </div>

        <div className={classes.paginationContainer}>
          <Pagination
            label="Results"
            hasPrevious={pagination.prev === null ? false : true}
            onPrevious={() => {
              fetchpage("prev");
            }}
            hasNext={pagination.next === null ? false : true}
            onNext={() => {
              fetchpage("next");
            }}
          />
        </div>
      </Card>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
// this function is passed as second argument to connect
const mapDispatchToProps = (dispatch) => {
  return {
    containerSearch: (value) => dispatch(containerSearch(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
