import { Card } from "@shopify/polaris";
import classes from "./Listing.modul.css";
import BannerProducts from "../banner/BannerProducts";
import FilterDrawer from "../filterDrawer/FilterDrawer";
import TopContent from "../topContent/TopContent";
import TabsComponent from "../tabsComponent/TabsComponent";
import ProductTable from "../productTable/ProductTable";
import { useState } from "react";

function Listing() {
  const [selected, setSelected] = useState(0);
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
          <div>
            <TabsComponent selected={selected} setSelected={setSelected} />
          </div>
          <div className={classes.searchFilterContainers}>
            <FilterDrawer />
          </div>
          <div>
            <ProductTable  selected={selected} setSelected={setSelected}/>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Listing;
