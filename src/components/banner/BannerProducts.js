import { Banner } from "@shopify/polaris";
import React, { useEffect } from "react";
import useFetch from "../../fetch";

function BannerProducts() {
  const { extractDataFromApi } = useFetch();
  const fetchFun = () => {
    var url = `https://multi-account.sellernext.com/home/public/amazon/product/getMatchStatusCount`;
    var method = "POST";
    var payload = {
      source: {
        marketplace: "shopify",
        shopId: "476",
      },
      target: {
        marketplace: "amazon",
        shopId: "479",
      },
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    var headers = {
      "Ced-Source-Id": 476,
      "Ced-Source-Name": "shopify",
      "Ced-Target-Id": 479,
      "Ced-Target-Name": "amazon",
      "Content-Type": "application/json",
      appCode:
        "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
      appTag: "amazon_sales_channel",
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg",
    };
    var temp = extractDataFromApi(url, payload, method, headers);
    temp.then((bannerData) => console.log(bannerData));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchFun(), []);

  return (
    <div>
      <div>
        <Banner
          status="warning"
          title="Before you can purchase a shipping label, this change needs to be made:"
          action={{ content: "Link Product" }}
        >
          <p>
            The section will enable you to manage all your listings of your
            active Amazon account.
          </p>
        </Banner>
      </div>
    </div>
  );
}

export default BannerProducts;
