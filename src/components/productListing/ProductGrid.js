import {Badge,Banner,Card,Frame,Heading,Icon,Navigation,Select,Stack,Tabs,TextField,TopBar,} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import {ArrowLeftMinor,HomeMinor,OrdersMinor,ProductsMinor,} from "@shopify/polaris-icons";
import { validate } from "../../redux/Action";
import { connect } from "react-redux";
import classes from "./ProductGrid.module.css";
import useFetch from "../../fetch";
import { Button, Image, Table, Typography } from "antd";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
const { Title } = Typography;
// column
const columns = [
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Product Details",
    dataIndex: "productDetails",
  },
  {
    title: "Template",
    dataIndex: "template",
  },
  {
    title: "Inventory",
    dataIndex: "inventory",
  },
  {
    title: "Amazon Status",
    dataIndex: "amazon",
  },
  {
    title: "Activity",
    dataIndex: "activity",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];
// functional component 
function ProductGrid(props) {
  // State variable to store the whole object
  const [productsData, setProductsData] = useState();
  // state variable to store the required fields
  const [productDataDisplay, setProductDataDisplay] = useState([]);
  const { extractDataFromApi } = useFetch();
  const fetchFun = () => {
    // following variables hold the info to be passed
    var url =
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts";
    var payload = {
      source: {
        marketplace: "shopify",
        shopId: "507",
      },
      target: {
        marketplace: "amazon",
        shopId: "509",
      },
      count: 1,
    };
    var method = "GET";
    var headers = {
      "Ced-Source-Id": 476,
      "Ced-Source-Name": "shopify",
      "Ced-Target-Id": 479,
      "Ced-Target-Name": "amazon",
      appCode:
        "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
      appTag: "amazon_sales_channel",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg",
    };
    // temporary varible to hold data
    var temp = extractDataFromApi(url, payload, method, headers);
    temp.then((data) => {
      setProductsData({ ...data });
      // console.log(data.data.rows);
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
                    alt={childItem.title}
                  />
                ),
                title: childItem.title,
                productDetails: (
                  <>
                    <Title level={5}>Price: ${childItem.price}</Title>
                    <br />
                    <Title level={5}>SKU: {childItem.sku}</Title>
                    <br />
                    {barCode ? (<Title level={5}>Barcode: {childItem.barcode} </Title>) : (<Title level={5}> Barcode: N/A</Title>)}
                    <br />
                    {asinCode ? (<Title level={5}>ASIN: {childItem.asin}</Title>) : (<Title level={5}>ASIN: N/A</Title>)}
                  </>
                ),
                template: "N/A",
                inventory: childItem.quantity,
              });
            } else {
              parentProductDetails = (
                <>
                  <>
                    <Title level={5}>SKU: {childDetails[childIndex].sku}</Title>
                    <br />
                    {asinCode ? (
                      <Title level={5}>
                        ASIN: {childDetails[childIndex].asin}
                      </Title>
                    ) : (
                      <>
                        <Title level={5}>ASIN: N/A</Title>
                      </>
                    )}
                  </>
                </>
              );
            }
          });
        } else {
          childDetails.forEach((parentItemDetails, parentItemIndex) => {
            console.log(parentItemDetails);
            console.log(parentContainer_id);
            console.log(parentItemDetails.source_product_id);
            if (parentContainer_id === parentItemDetails.source_product_id) {
              console.log(parentItemDetails.source_product_id);
              parentProductDetails = (
                <>
                  <>
                    <Title level={5}>Price: ${parentItemDetails.price}</Title>
                    <br />
                    <Title level={5}>SKU: {parentItemDetails.sku}</Title>
                    <br />
                    {parentItemDetails.asin ? (
                      <Title level={5}>ASIN: {parentItemDetails.asin}</Title>
                    ) : (
                      <Title level={5}>ASIN: N/A</Title>
                    )}
                    <br />
                    {parentItemDetails.barCode ? (
                      <Title level={5}>
                        Barcode: {parentItemDetails.barcode}
                      </Title>
                    ) : (
                      <Title level={5}>Barcode:N/A</Title>
                    )}
                  </>
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
          inventory: inventoryQuantity + "in stock",
          actions: (
            <Button>
              <Icon source={MobileVerticalDotsMajor} color="base" />
            </Button>
          ),
          activity: "--",
          description: [...childData],
        });

        //
        console.log(item.title);
      });
      setProductDataDisplay([...storeData]);
    });
  };
  console.log(productDataDisplay);
  console.log(productsData);
  // calling function to fetch data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchFun(), []);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );
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
          Not Listed <Badge status="new">4</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Inactive",
      content: (
        <span>
          Inactive <Badge status="critical">4</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Incomplete",
      content: (
        <span>
          Incomplete<Badge status="warning">4</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "active",
      content: (
        <span>
          Active <Badge status="success">4</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "error",
      content: (
        <span>
          Error <Badge status="critical">4</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
  ];

  const logo = {
    width: 50,
    topBarSource:
      "https://cdn.shopify.com/app-store/listing_images/0632f97b04f3464ee3d9148e7b84c9a9/icon/CMP07ajunPQCEAE=.png",
    accessibilityLabel: "Cedcommerce logo",
  };
  const logout = () => {
    // functionality to be provided
  };
  const userMenuMarkup = (
    <TopBar.UserMenu
      name={props.user.sellerName}
      detail={props.user.username}
      initials={props.user.sellerName.charAt(0)}
      actions={[
        {
          items: [
            { content: "Logout", icon: ArrowLeftMinor, onAction: logout },
          ],
        },
      ]}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const topBarMarkup = (
    <TopBar showNavigationToggle userMenu={userMenuMarkup} />
  );

  return (
    <>
      {/* Topbar markup */}
      <div>
        <div style={{ height: "50px" }}>
          <Frame topBar={topBarMarkup} logo={logo} />
        </div>
        {/* table container div */}
        <div className={classes.tableContainer}>
          {/* div containing the navigation menu */}
          <div className={classes.navContainer}>
            <Frame>
              <Navigation location="/">
                <Navigation.Section
                  items={[
                    {
                      url: "/",
                      label: "Home",
                      icon: HomeMinor,
                    },
                    {
                      url: "/path/to/place",
                      label: "Orders",
                      icon: OrdersMinor,
                      badge: "15",
                    },
                    {
                      url: "/path/to/place",
                      label: "Products",
                      icon: ProductsMinor,
                    },
                  ]}
                />
              </Navigation>
            </Frame>
          </div>

          {/* div containing the grid */}
          <div className={classes.gridContainer}>
            <div className={classes.topContent}>
              <div>
                <Heading>Listings</Heading>
                <p>
                  The section will enable you to manage all your listings of
                  your active Amazon account. The feature helps you view the
                  status of your listings along with performing actions like
                  Bulk upload, running Sync Status, Amazon Lookup, or linking
                  your unlinked Products by getting directed to the Product
                  Linking section.
                </p>
                <div>
                  <Banner
                    status="warning"
                    title="Before you can purchase a shipping label, this change needs to be made:"
                    action={{ content: "Edit address" }}
                  >
                    <p>
                    The section will enable you to manage all your listings of
                  your active Amazon account.
                    </p>
                  </Banner>
                </div>
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
                  <Stack>
                    <TextField placeholder="Search with title vendor or product" />
                    <Button>More Filters</Button>
                    <Select></Select>
                    <Button>Sync Status</Button>
                    <Button>Amazon Lookup</Button>
                    <Select></Select>
                  </Stack>
                </div>
                <Card.Section title={tabs[selected].content}>
                  <Table
                    expandable={{
                      expandedRowRender: (record) => (
                        <Table
                          bordered
                          columns={columns}
                          dataSource={record.description}
                          pagination={false}
                        />
                      ),
                      rowExpandable: (record) => record.description.length > 0,
                    }}
                    bordered
                    columns={columns}
                    rowSelection={{
                    }}
                    dataSource={productDataDisplay}
                  />
                </Card.Section>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
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
