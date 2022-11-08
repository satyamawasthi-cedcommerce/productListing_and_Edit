import { Autocomplete, Icon, Stack } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../fetch";
import { SearchMinor } from "@shopify/polaris-icons";
import { Image } from "antd";
import { connect } from "react-redux";
import { containerSearch } from "../../redux/Action";

function Search(props) {
  const deselectedOptions = [];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [searchValue, setSearchValue] = useState();
  const { extractDataFromApi } = useFetch();
  const searchSuggestions = [];
  useEffect(() => {
    var url = `https://multi-account.sellernext.com/home/public/connector/product/getSearchSuggestions?query=${searchValue}`;
    var temp = extractDataFromApi(url);
    temp.then((searchedData) => {
      searchedData.data.forEach((item, index) => {
        // console.log(props.state);
        if (
          item.product_type.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          searchSuggestions.push({
            key: index,
            title: item.title,
            value: { id: item.container_id, title: item.title },
            label: (
              <>
                <div>
                  <Stack>
                    <Image src={item.main_image} width={100}></Image>

                    <p>Title:{item.title}</p>
                    <br />
                    <p>Brand:{item.brand}</p>
                  </Stack>
                </div>
              </>
            ),
          });
        }

        setOptions(searchSuggestions);
      });
    });
  }, [searchValue, extractDataFromApi, searchSuggestions]);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          // props.conatinerId=option.value;
          // props.conatinerId(options.value)
          // console.log("option", option.value.id);
          // props.container_id
          return option.value.title.match(selectedItem.title);
        });
        return matchedOption;
      });

      setSelectedOptions(selectedValue);
      props.containerSearch(selectedValue[0].value);

      setSearchValue(selectedValue[0].title);
      setInputValue(selectedValue[0].title);
    },
    [options,props]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={(value) => setSearchValue(value)}
      value={searchValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );
  return (
    <>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);
