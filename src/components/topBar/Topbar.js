import { Frame, TopBar } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { validate } from "../../redux/Action";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
function Topbar(props) {
  const [userDetails, setUserDetails] = useState({
    ...JSON.parse(sessionStorage.getItem("userCredentials")),
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );
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
      name={userDetails.sellerName}
      detail={userDetails.username}
      initials={userDetails.sellerName.charAt(0)}
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
      <Frame topBar={topBarMarkup} logo={logo} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
