import { Icon } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { validate } from "../../redux/Action";
import { connect } from "react-redux";
import classes from "./ProductGrid.module.css";
import useFetch from "../../fetch";
import { Button, Image } from "antd";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import NavigationBar from "../navigation/NavigationBar";
import Topbar from "../topBar/Topbar";
import Listing from "../listingGrid/Listing";
// functional component
function ProductGrid() {
  // State variable to store the whole object
  const [productsData, setProductsData] = useState();
  // state variable to store the required fields
  const [productDataDisplay, setProductDataDisplay] = useState([]);
  const { extractDataFromApi } = useFetch();
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = useState(false);
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
  return (
    <>
      {/* Topbar markup */}
      <div style={{ height: "50px" }}>
        <Topbar />
      </div>
      {/* table container div */}
      <div className={classes.tableContainer}>
        {/* div containing the navigation menu */}
        <div className={classes.navContainer}>
          <NavigationBar />
        </div>
        <div className={classes.listContainer}>
        <Listing />
        </div>
      </div>
    </>
  );
}
// redux functions
const mapStateToProps = (state) => {
  return {
    user: state.userCredentials,
  };
};
// this function is passed as second argument to connect
const mapDispatchToProps = (dispatch) => {
  return {
    validate: (value) => dispatch(validate(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
