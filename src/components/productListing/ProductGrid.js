import { validate } from "../../redux/Action";
import { connect } from "react-redux";
import classes from "./ProductGrid.module.css";
import NavigationBar from "../navigation/NavigationBar";
import Topbar from "../topBar/Topbar";
import Listing from "../listingGrid/Listing";
// functional component
function ProductGrid() {
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
