import { Frame, Navigation } from "@shopify/polaris";
import React from "react";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
function NavigationBar() {
  return (
    <>
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
    </>
  );
}

export default NavigationBar;
