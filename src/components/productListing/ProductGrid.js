import {
  Badge,
  Card,
  Frame,
  Heading,
  Navigation,
  Tabs,
  TopBar,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeftMinor,
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
} from "@shopify/polaris-icons";
import { validate } from "../../redux/Action";
import { connect } from "react-redux";
import classes from "./ProductGrid.module.css";
import useFetch from "../../fetch";
function ProductGrid(props) {
  const { data, extractDataFromApi } = useFetch();
  const fetchFun = () => {
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
      "Ced-Source-Id": 500,
      "Ced-Source-Name": "shopify",
      "Ced-Target-Id": 530,
      "Ced-Target-Name": "amazon",
      appCode:
        "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
      appTag: "amazon_sales_channel",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY3MjI1NTMwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY5ZjdhMGI5YjIwMTVlNTQ0MjM2NyJ9.Tbaa3G1Jv8r7xAg6Y16fK2FTTso8j-NuI5IcMn9FJ8W4bd_k4uiNqJVMC__NC1OWn8ldrcmzJGwffop5rNQLRIdObWbIzr2TBxmDwtJKRSMh-4-amDO6wJQiJSe1rl6CIyZXMcZnAB3rPf9vka4JWhFfNntLgZlGfoLWYCnOsww_xygFyvxXKNrBEZic3XHBn3fnrlDahyrPwp0M3VQaE2lNJDZgSERvdkbLkL-Kkj9St7GT9nc01k8TcVGiKmy84a9MJd6VmeZqNXaamG-Fm-_ju1tvZfwO3O3Bln8BaCDvgpgqbYlLEEUBROJbccYFl46-z_GqIBVgKbdaCrl3KQ",
    };
    // temporary varible to hold data
    var temp = extractDataFromApi(url, payload, method, headers);
    temp.then((data) => {
      console.log(data);
    });
  };
  // calling function to fetch data
  useEffect(() => fetchFun());
  console.log(data);
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
    <div>
      <div style={{ height: "50px" }}>
        <Frame topBar={topBarMarkup} logo={logo} />
      </div>
      <div className={classes.tableContainer}>
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
        <div className={classes.gridContainer}>
          <div className={classes.topContent}>
            <div>
              <Heading>Listings</Heading>
              <p>
                The section will enable you to manage all your listings of your
                active Amazon account. The feature helps you view the status of
                your listings along with performing actions like Bulk upload,
                running Sync Status, Amazon Lookup, or linking your unlinked
                Products by getting directed to the Product Linking section.
              </p>
            </div>
            <div></div>
          </div>
          <br />
          <Card>
            <Tabs
              tabs={tabs}
              selected={selected}
              onSelect={handleTabChange}
              fitted
            >
              <Card.Section title={tabs[selected].content}>
                <p>Tab {selected} selected</p>
              </Card.Section>
              {/* {selected === 0 ? 
              <Card>hjgsh</Card>:<></>
            } */}
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
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
